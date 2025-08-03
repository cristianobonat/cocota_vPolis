import React, { useState, useEffect } from 'react';

const MarkdownEditorApp = ({ onBack }) => {
    const [markdown, setMarkdown] = useState('# Olá, Editor Markdown!\n\nComece a digitar aqui.');
    const [htmlOutput, setHtmlOutput] = useState('');

    useEffect(() => {
        if (!window.marked) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            script.async = true;
            script.onload = () => {
                setHtmlOutput(window.marked.parse(markdown));
            };
            document.body.appendChild(script);
            
            return () => {
                document.body.removeChild(script);
            }
        } else {
             setHtmlOutput(window.marked.parse(markdown));
        }
    }, [markdown]);

    return (
        <div className="min-h-screen bg-amber-50 font-serif p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
                 <h1 className="text-3xl font-bold text-amber-900">Editor Didático Markdown</h1>
                 <button onClick={onBack} className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Voltar ao Portal</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-150px)]">
                <div className="flex flex-col">
                    <label htmlFor="markdown-input" className="text-amber-800 font-bold mb-2">Seu Texto (Markdown)</label>
                    <textarea
                        id="markdown-input"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="w-full h-full p-4 border rounded-lg shadow-inner bg-white font-mono text-sm border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-amber-800 font-bold mb-2">Visualização (Corretivo)</label>
                    <div 
                        className="w-full h-full p-4 border rounded-lg shadow-inner bg-white prose prose-sm max-w-none overflow-y-auto border-amber-200"
                        dangerouslySetInnerHTML={{ __html: htmlOutput }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditorApp;

