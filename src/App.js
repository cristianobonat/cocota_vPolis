import React, { useState, useEffect } from 'react';

// Importando os componentes que criamos
// Assumindo que eles estão em uma pasta 'src/components/'
import LoginPage from './components/LoginPage';
import PortalPage from './components/PortalPage';
import CreateEditPage from './components/CreateEditPage';
import ViewSubPage from './components/ViewSubPage';
import MarkdownEditorApp from './components/MarkdownEditorApp';

// Importando as funções do Firebase
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged,
    signInWithCustomToken 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query,
    doc,
    setDoc
} from 'firebase/firestore';


// --- Configuração do Firebase ---
const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : { apiKey: "...", authDomain: "...", projectId: "...", storageBucket: "...", messagingSenderId: "...", appId: "..." };

const appId = typeof __app_id !== 'undefined' ? __app_id : 'cocota-vpolis-default';

// --- Inicialização do Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// --- Componente Principal da Aplicação ---
export default function App() {
    const [page, setPage] = useState('login'); // 'login', 'portal', 'create', 'edit', 'view', 'markdown_editor'
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
                try {
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    console.error("Erro na autenticação:", error);
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

    const handleLogin = (username) => {
        setUser(username);
        setPage('portal');
    };

    const handleLogout = () => {
        setUser(null);
        setPage('login');
    };

    const handleSavePage = async (pageData) => {
        if (!userId) {
            console.error("Não é possível salvar: userId é nulo.");
            return;
        }
        const pagesCollectionPath = `artifacts/${appId}/users/${userId}/pages`;
        try {
            if (pageData.id) {
                const pageRef = doc(db, pagesCollectionPath, pageData.id);
                await setDoc(pageRef, { title: pageData.title, content: pageData.content }, { merge: true });
            } else {
                await addDoc(collection(db, pagesCollectionPath), {
                    title: pageData.title,
                    content: pageData.content,
                    createdAt: new Date(),
                    author: user,
                });
            }
            setPage('portal');
            setCurrentPage(null);
        } catch (error) {
            console.error("Erro ao salvar página: ", error);
        }
    };
    
    const handleSelectPage = (page) => {
        setCurrentPage(page);
        setPage('view');
    };
    
    const handleNavigate = (destination) => {
        if (destination === 'markdown_editor') {
            setPage('markdown_editor');
        }
    };

    if (!isAuthReady) {
        return <div className="min-h-screen flex items-center justify-center bg-amber-50 font-serif text-amber-900">Carregando portal...</div>;
    }

    switch (page) {
        case 'portal':
            return <PortalPage user={user} userPages={userPages} onSelectPage={handleSelectPage} onCreatePage={() => { setCurrentPage(null); setPage('create'); }} onNavigate={handleNavigate} onLogout={handleLogout} userId={userId} />;
        case 'create':
            return <CreateEditPage onSave={handleSavePage} onBack={() => setPage('portal')} />;
        case 'edit':
             return <CreateEditPage onSave={handleSavePage} onBack={() => setPage('portal')} pageToEdit={currentPage} />;
        case 'view':
            return <ViewSubPage page={currentPage} onBack={() => setPage('portal')} />;
        case 'markdown_editor':
            return <MarkdownEditorApp onBack={() => setPage('portal')} />;
        case 'login':
        default:
            return <LoginPage onLogin={handleLogin} />;
    }
}

