import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs } from '../components/ui/tabs';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {activeTab === 'login' ? 'Entrar na Conta' : 'Criar Conta'}
        </h1>

        <Tabs 
          tabs={[
            { id: 'login', label: 'Entrar' },
            { id: 'signup', label: 'Cadastrar' }
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 space-y-4">
          {activeTab === 'signup' && (
            <Input label="Nome Completo" placeholder="Seu nome" />
          )}
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
          <Input label="Senha" type="password" placeholder="********" />
          {activeTab === 'signup' && (
            <Input label="Confirmar Senha" type="password" placeholder="********" />
          )}

          <Button variant="primary" className="w-full mt-4">
            {activeTab === 'login' ? 'Entrar' : 'Criar Conta'}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            {activeTab === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              {activeTab === 'login' ? 'Cadastre-se' : 'Entre aqui'}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
