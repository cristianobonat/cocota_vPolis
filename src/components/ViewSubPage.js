import React from 'react';

const ViewSubPage = ({ page, onBack }) => {
    const exportToHtml = () => {
        const htmlContent = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${page.title}</title><style>body { font-family: serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #fdfaf4; border: 1px solid #e2d8c1; } h1, h2, h3 { color: #5a4628; }</style></head><body><h1>${page.title}</h1><hr><div>${page.content}</div><hr><p style="font-size: 0.8em; color: #777;">Exportado de COCOTA_vPolis</p></body></html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${page.title.replace(/ /g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <button onClick={onBack} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">← Voltar ao Portal</button>
                    <button onClick={exportToHtml} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Exportar para HTML</button>
                </div>
                <div className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 pb-2 border-b">{page.title}</h1>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }}></div>
                </div>
            </div>
        </div>
    );
};

export default ViewSubPage;

