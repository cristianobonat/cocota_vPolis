import React from 'react';

// --- Ícones como componentes ---
const NewspaperIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/><path d="M8 7h6"/><path d="M8 11h6"/><path d="M8 15h6"/></svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-2 text-amber-800"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
);
const MarkdownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-2 text-amber-800"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
);


const PortalPage = ({ user, userPages, onSelectPage, onCreatePage, onNavigate, onLogout, userId }) => {
    return (
        <div className="min-h-screen bg-amber-50 font-serif text-amber-900 p-4 sm:p-6 md:p-8">
            <header className="flex justify-between items-center pb-4 mb-6 border-b-2 border-amber-800/50">
                <div className="flex items-center">
                    <NewspaperIcon />
                    <h1 className="text-3xl md:text-4xl font-bold">Portal COCOTA_vPolis</h1>
                </div>
                <div className="text-right">
                    <p className="text-sm">Bem-vindo(a), <span className="font-bold">{user}</span></p>
                    <button onClick={onLogout} className="text-sm text-amber-700 hover:underline">Sair</button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <section className="p-4 bg-white/50 border border-amber-200 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold border-b border-amber-300 pb-2 mb-4">Apps Disponíveis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button onClick={() => onNavigate('polis_manager')} className="text-center p-4 bg-amber-50 rounded-lg shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 border border-amber-100">
                                <EditIcon />
                                <h3 className="font-bold text-lg">Gerenciador de Polis</h3>
                                <p className="text-sm text-amber-700">Crie e gerencie suas páginas web.</p>
                            </button>
                            <button onClick={() => onNavigate('markdown_editor')} className="text-center p-4 bg-amber-50 rounded-lg shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 border border-amber-100">
                                <MarkdownIcon />
                                <h3 className="font-bold text-lg">Editor Markdown</h3>
                                <p className="text-sm text-amber-700">Escreva e formate textos didáticos.</p>
                            </button>
                        </div>
                    </section>
                    <section className="p-4 bg-white/50 border border-amber-200 rounded-lg shadow-md">
                        <div className="flex justify-between items-center border-b border-amber-300 pb-2 mb-4">
                            <h2 className="text-2xl font-bold">Minhas Polis</h2>
                            <button onClick={onCreatePage} className="bg-amber-800 text-white font-bold py-1 px-3 text-sm rounded-md hover:bg-amber-900 transition-colors">+ Nova Polis</button>
                        </div>
                        {userPages.length > 0 ? (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {userPages.map(page => (
                                    <li key={page.id}>
                                        <button onClick={() => onSelectPage(page)} className="w-full text-left p-2 rounded hover:bg-amber-100 transition-colors duration-200">{page.title}</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-amber-700 italic">Você ainda não criou nenhuma Polis. Clique em "+ Nova Polis" para começar.</p>
                        )}
                    </section>
                </div>
                <section className="p-4 bg-white/50 border border-amber-200 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold border-b border-amber-300 pb-2 mb-4">Notícias da Rede</h2>
                    <div className="space-y-4 text-sm text-amber-800">
                        <p><span className="font-bold">Anúncio:</span> A versão Alpha da COCOTA_vPolis está no ar!</p>
                        <p><span className="font-bold">Novidade:</span> Agora com um Editor Markdown didático!</p>
                        <p><span className="font-bold">Seu ID de Usuário:</span> <br/><code className="text-xs break-all">{userId}</code></p>
                        <p className="italic">O poder da web descentralizada está em suas mãos.</p>
                    </div>
                </section>
            </main>
             <footer className="text-center mt-8 pt-4 border-t border-amber-200 text-xs text-amber-600">
                <p>COCOTA_vPolis | Um projeto para uma web mais livre e didática.</p>
            </footer>
        </div>
    );
};

export default PortalPage;

