// src/components/SimpleTest.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const SimpleTest = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    setMessage('Tentando login...');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setMessage(`✅ Sucesso! Logado como: ${result.user.displayName}`);
      
      console.log('🔍 DETALHES DO PROJETO:');
      console.log('Projeto Firebase:', auth.app.options.projectId);
      console.log('Domínio Auth:', auth.app.options.authDomain);
      console.log('Usuário:', result.user);
      
    } catch (error) {
      console.error('❌ ERRO COMPLETO:', error);
      setMessage(`❌ Falha: ${error.code}\n${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1>MasterPlays - Teste Firebase</h1>
      
      <div style={styles.infoBox}>
        <h3>Configuração Atual:</h3>
        <p><strong>Projeto Firebase:</strong> masterpllays</p>
        <p><strong>Domínio Auth:</strong> masterpllays.firebaseapp.com</p>
        <p><strong>Seu domínio:</strong> {window.location.hostname}</p>
      </div>

      <button onClick={handleLogin} style={styles.button}>
        🔐 Testar Login com Google
      </button>

      <div style={styles.messageBox}>
        {message}
      </div>

      {user && (
        <div style={styles.userBox}>
          <h3>👋 Olá, {user.displayName}!</h3>
          <p>Email: {user.email}</p>
          {user.photoURL && (
            <img src={user.photoURL} alt="Avatar" style={styles.avatar} />
          )}
        </div>
      )}

      <div style={styles.helpBox}>
        <h3>Se não funcionar:</h3>
        <ol>
          <li>Vá para: <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">Firebase Console</a></li>
          <li>Certifique-se que está no projeto <strong>"masterpllays"</strong> (com DOIS L)</li>
          <li>Vá para: Build → Authentication → Sign-in method</li>
          <li>Ative "Google" como provedor</li>
          <li>Em Settings → Authorized domains, adicione:
            <ul>
              <li><code>localhost</code></li>
              <li><code>afabelfilipe1.github.io</code></li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    textAlign: 'left'
  },
  button: {
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    fontSize: '18px',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '20px 0'
  },
  messageBox: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    minHeight: '60px',
    whiteSpace: 'pre-line'
  },
  userBox: {
    backgroundColor: '#e8f5e9',
    padding: '25px',
    borderRadius: '10px',
    marginTop: '20px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginTop: '15px'
  },
  helpBox: {
    backgroundColor: '#fff3cd',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '30px',
    textAlign: 'left'
  }
};

export default SimpleTest;