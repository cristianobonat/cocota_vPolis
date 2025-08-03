import React, { useState } from 'react';

const CreateEditPage = ({ onSave, onBack, pageToEdit }) => {
    const [title, setTitle] = useState(pageToEdit ? pageToEdit.title : '');
    const [content, setContent] = useState(pageToEdit ? pageToEdit.content : '');

    const handleSave = () => {
        if (title && content) {
            onSave({ ...pageToEdit, title, content });
        } else {
            alert('Por favor, preencha o título e o conteúdo.');
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 font-serif p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-amber-200">
                <h1 className="text-3xl font-bold text-amber-900 mb-6">{pageToEdit ? 'Editando Polis' : 'Criando Nova Polis'}</h1>
                <div className="mb-4">
                    <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="pageTitle">Título da Polis</label>
                    <input id="pageTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-amber-50 border-amber-300" placeholder="Ex: Minhas Reflexões Filosóficas"/>
                </div>
                <div className="mb-6">
                    <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="pageContent">Conteúdo (suporta HTML básico)</label>
                    <textarea id="pageContent" value={content} onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-amber-50 border-amber-300 h-64" placeholder="Escreva aqui o conteúdo da sua página. Você pode usar tags como <h1>, <p>, <b>, etc."/>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={onBack} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Voltar ao Portal</button>
                    <button onClick={handleSave} className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Salvar Polis</button>
                </div>
            </div>
        </div>
    );
};

export default CreateEditPage;

