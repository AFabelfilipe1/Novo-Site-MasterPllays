// src/components/SimpleTest.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SimpleTest: React.FC = () => {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGoogleLogin = async () => {
    setMessage('Iniciando login...');
    setError('');
    
    try {
      await loginWithGoogle();
      setMessage('Login realizado com sucesso!');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Erro detalhado:', error);
      setError(`Erro: ${error.message}`);
      setMessage('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMessage('Logout realizado com sucesso!');
    } catch (err: unknown) {
      const error = err as Error;
      setError(`Erro no logout: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🔧 Teste Firebase Authentication</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Informações do Projeto</h2>
        <ul className="space-y-2">
          <li><strong>Projeto Firebase:</strong> masterpllays</li>
          <li><strong>Domínio Auth:</strong> masterpllays.firebaseapp.com</li>
          <li><strong>Domínio Atual:</strong> {window.location.hostname}</li>
          <li><strong>Status:</strong> {user ? '✅ Logado' : '❌ Não logado'}</li>
        </ul>
      </div>

      {!user ? (
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-3 mx-auto"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Login com Google
          </button>
        </div>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">✅ Logado com Sucesso!</h2>
          <div className="flex flex-col items-center mb-6">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Usuário'} 
                className="w-24 h-24 rounded-full mb-4"
              />
            )}
            <p className="text-xl font-semibold">{user.displayName}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">ID: {user.uid.substring(0, 10)}...</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Sair
          </button>
        </div>
      )}

      {message && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
          <h3 className="font-bold">Erro:</h3>
          <p className="whitespace-pre-wrap">{error}</p>
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <h4 className="font-bold">Solução:</h4>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Verifique se está no projeto <strong>masterpllays</strong> no Firebase Console</li>
              <li>Ative Google Sign-in em Authentication → Sign-in method</li>
              <li>Adicione <code>{window.location.hostname}</code> em Authorized domains</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-3">Próximos Passos:</h3>
        <ul className="space-y-2">
          <li>✅ Acesse: <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Firebase Console</a></li>
          <li>✅ Verifique projeto: <strong>masterpllays</strong> (com DOIS L)</li>
          <li>✅ Vá para: Build → Authentication → Sign-in method</li>
          <li>✅ Ative "Google" como provedor</li>
          <li>✅ Em Settings → Authorized domains, adicione:
            <ul className="ml-6 mt-2 space-y-1">
              <li><code>localhost</code></li>
              <li><code>afabelfilipe1.github.io</code></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleTest;