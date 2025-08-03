import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Por favor, preencha o usuário e a senha.');
            return;
        }
        setError('');
        console.log(`Simulando login para o usuário: ${username}`);
        onLogin(username);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50 font-serif p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 border-4 border-amber-800/50">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-900">COCOTA_vPolis</h1>
                    <p className="text-amber-700 mt-2">O seu portal para a web descentralizada.</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="username">Nome de Usuário</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-amber-50 border-amber-300" placeholder="ex: MachadoDeAssis"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="password">Senha</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-amber-50 border-amber-300" placeholder="******************"/>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">Entrar no Portal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

