import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import PortalPage from './components/PortalPage';
import CreateEditPage from './components/CreateEditPage';
import ViewSubPage from './components/ViewSubPage';
import MarkdownEditorApp from './components/MarkdownEditorApp';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, doc, setDoc } from 'firebase/firestore';

// --- Configuração do Firebase para Produção ---
// IMPORTANTE: Cole aqui as suas credenciais do Firebase.
// Você pode encontrá-las no Console do Firebase > Configurações do Projeto.
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Usamos um ID de app fixo para o deploy
const appId = 'cocota-vpolis-deploy';

// --- Inicialização do Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Componente Principal da Aplicação ---
export default function App() {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userPages, setUserPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUserId(firebaseUser.uid);
            } else {
                // No ambiente de produção, sempre usamos o login anônimo
                try {
                    await signInAnonymously(auth);
                } catch (error) {
                    console.error("Erro na autenticação anônima:", error);
                }
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isAuthReady || !userId) return;
        const pagesCollectionPath = `artifacts/${appId}/users/${userId}/pages`;
        const q = query(collection(db, pagesCollectionPath));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const pagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserPages(pagesData);
        }, (error) => {
            console.error("Erro ao buscar páginas:", error);
        });
        return () => unsubscribe();
    }, [isAuthReady, userId]);

    const handleLogin = (username) => { setUser(username); setPage('portal'); };
    const handleLogout = () => { setUser(null); setPage('login'); };

    const handleSavePage = async (pageData) => {
        if (!userId) { return; }
        const pagesCollectionPath = `artifacts/${appId}/users/${userId}/pages`;
        try {
            if (pageData.id) {
                const pageRef = doc(db, pagesCollectionPath, pageData.id);
                await setDoc(pageRef, { title: pageData.title, content: pageData.content }, { merge: true });
            } else {
                await addDoc(collection(db, pagesCollectionPath), {
                    title: pageData.title, content: pageData.content, createdAt: new Date(), author: user,
                });
            }
            setPage('portal');
            setCurrentPage(null);
        } catch (error) { console.error("Erro ao salvar página: ", error); }
    };

    const handleSelectPage = (page) => { setCurrentPage(page); setPage('view'); };
    const handleNavigate = (destination) => { if (destination === 'markdown_editor') { setPage('markdown_editor'); } };

    if (!isAuthReady) { return <div>Carregando portal...</div>; }

    switch (page) {
        case 'portal': return <PortalPage user={user} userPages={userPages} onSelectPage={handleSelectPage} onCreatePage={() => { setCurrentPage(null); setPage('create'); }} onNavigate={handleNavigate} onLogout={handleLogout} userId={userId} />;
        case 'create': return <CreateEditPage onSave={handleSavePage} onBack={() => setPage('portal')} />;
        case 'edit': return <CreateEditPage onSave={handleSavePage} onBack={() => setPage('portal')} pageToEdit={currentPage} />;
        case 'view': return <ViewSubPage page={currentPage} onBack={() => setPage('portal')} />;
        case 'markdown_editor': return <MarkdownEditorApp onBack={() => setPage('portal')} />;
        default: return <LoginPage onLogin={handleLogin} />;
    }
}

