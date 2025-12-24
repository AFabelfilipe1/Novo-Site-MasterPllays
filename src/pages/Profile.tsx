// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateProfile(user, {
        displayName: displayName
      });

      // Se o email foi alterado, precisa reautenticar
      if (email !== user.email && currentPassword) {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, email);
      }

      // Se nova senha foi definida
      if (newPassword && currentPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Recarregar a página para atualizar o header
      setTimeout(() => window.location.reload(), 1500);

    } catch (err: any) {
      console.error('Erro ao atualizar perfil:', err);

      switch (err.code) {
        case 'auth/requires-recent-login':
          setError('Para alterar email ou senha, faça login novamente.');
          break;
        case 'auth/wrong-password':
          setError('Senha atual incorreta.');
          break;
        case 'auth/email-already-in-use':
          setError('Este email já está em uso.');
          break;
        case 'auth/weak-password':
          setError('A nova senha deve ter pelo menos 6 caracteres.');
          break;
        default:
          setError('Erro ao atualizar perfil. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      setError('Digite sua senha atual para confirmar a exclusão.');
      return;
    }

    setIsSubmitting(true);
    try {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      setSuccess('Conta excluída com sucesso.');
      setTimeout(() => logout(), 2000);

    } catch (err: any) {
      console.error('Erro ao excluir conta:', err);

      switch (err.code) {
        case 'auth/wrong-password':
          setError('Senha incorreta.');
          break;
        default:
          setError('Erro ao excluir conta. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGoogleUser = user.providerData.some(provider => provider.providerId === 'google.com');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
            <p className="text-gray-600 mt-2">Gerencie suas informações pessoais</p>
          </div>

          {/* Avatar e Info Básica */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user.displayName || 'Usuário'}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Conta criada em {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR') : 'Data desconhecida'}
            </p>
            {isGoogleUser && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                Conta Google
              </span>
            )}
          </div>

          {/* Mensagens de Status */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Formulário de Edição */}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Nome de Exibição
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {!isGoogleUser && (
                <>
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Senha Atual (obrigatória para alterações)
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite sua senha atual"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      Nova Senha (opcional)
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite a nova senha"
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirme a nova senha"
                      minLength={6}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setDisplayName(user.displayName || '');
                    setEmail(user.email || '');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Editar Perfil
              </button>
            </div>
          )}

          {/* Excluir Conta */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Zona de Perigo</h3>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Excluir Conta
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Esta ação não pode ser desfeita. Digite sua senha para confirmar:
                </p>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Digite sua senha"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Excluindo...' : 'Confirmar Exclusão'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setCurrentPassword('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;