// src/pages/Pagamento.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Pagamento: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'method' | 'form'>('method');
  const [isProcessing, setIsProcessing] = useState(false);

  // Dados do plano selecionado (vem via URL params)
  const planName = searchParams.get('plano');
  const planPrice = searchParams.get('preco');

  // Formulários
  const [cardData, setCardData] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
    cpf: ''
  });

  const [pixData, setPixData] = useState({
    cpf: '',
    nome: ''
  });

  const [boletoData, setBoletoData] = useState({
    cpf: '',
    nome: '',
    email: ''
  });

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Redirecionar se não houver plano selecionado
  useEffect(() => {
    if (!planName || !planPrice) {
      navigate('/planos');
    }
  }, [planName, planPrice, navigate]);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setCurrentStep('form');
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulação de processamento
    setTimeout(() => {
      alert(`✅ Pagamento do plano ${planName} via Cartão de Crédito processado com sucesso!\n\nValor: ${planPrice}\nCartão: **** **** **** ${cardData.numero.slice(-4)}`);
      navigate('/');
    }, 2000);
  };

  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulação de processamento
    setTimeout(() => {
      alert(`✅ Pagamento do plano ${planName} via PIX processado com sucesso!\n\nValor: ${planPrice}\nCódigo PIX gerado e enviado para seu email.`);
      navigate('/');
    }, 2000);
  };

  const handleBoletoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulação de processamento
    setTimeout(() => {
      alert(`✅ Boleto do plano ${planName} gerado com sucesso!\n\nValor: ${planPrice}\nBoleto enviado para seu email.`);
      navigate('/');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 11) {
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return v;
  };

  if (!user || !planName || !planPrice) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Pagamento</h1>
          <p className="mt-2 text-gray-600">
            Plano: <span className="font-semibold">{planName}</span> - {planPrice}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'method' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep === 'form' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <span className={currentStep === 'method' ? 'font-semibold' : ''}>Método</span>
            <span className="mx-4">→</span>
            <span className={currentStep === 'form' ? 'font-semibold' : ''}>Dados</span>
          </div>
        </div>

        {currentStep === 'method' ? (
          /* Seleção de Método de Pagamento */
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Escolha o Método de Pagamento</h2>

            <div className="grid gap-4">
              <button
                onClick={() => handleMethodSelect('cartao')}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💳</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Cartão de Crédito</h3>
                  <p className="text-sm text-gray-600">Visa, Mastercard, Elo, American Express</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('pix')}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">PIX</h3>
                  <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                </div>
              </button>

              <button
                onClick={() => handleMethodSelect('boleto')}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📄</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Boleto Bancário</h3>
                  <p className="text-sm text-gray-600">Vencimento em 3 dias úteis</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => navigate('/planos')}
              className="w-full mt-6 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              ← Voltar para Planos
            </button>
          </div>
        ) : (
          /* Formulários de Pagamento */
          <div className="bg-white rounded-lg shadow-md p-8">
            {selectedMethod === 'cartao' && (
              <form onSubmit={handleCardSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Dados do Cartão</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    value={cardData.numero}
                    onChange={(e) => setCardData({...cardData, numero: formatCardNumber(e.target.value)})}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    value={cardData.nome}
                    onChange={(e) => setCardData({...cardData, nome: e.target.value.toUpperCase()})}
                    placeholder="JOÃO DA SILVA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      value={cardData.validade}
                      onChange={(e) => setCardData({...cardData, validade: formatExpiry(e.target.value)})}
                      placeholder="MM/AA"
                      maxLength={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF do Titular
                  </label>
                  <input
                    type="text"
                    value={cardData.cpf}
                    onChange={(e) => setCardData({...cardData, cpf: formatCPF(e.target.value)})}
                    placeholder="123.456.789-00"
                    maxLength={14}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('method')}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processando...' : `Pagar ${planPrice}`}
                  </button>
                </div>
              </form>
            )}

            {selectedMethod === 'pix' && (
              <form onSubmit={handlePixSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Pagamento via PIX</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={pixData.cpf}
                    onChange={(e) => setPixData({...pixData, cpf: formatCPF(e.target.value)})}
                    placeholder="123.456.789-00"
                    maxLength={14}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={pixData.nome}
                    onChange={(e) => setPixData({...pixData, nome: e.target.value})}
                    placeholder="João da Silva"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Como funciona:</strong><br />
                    1. Clique em "Gerar PIX"<br />
                    2. Use o QR Code ou copie o código PIX<br />
                    3. Pague no app do seu banco<br />
                    4. O pagamento é confirmado automaticamente
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('method')}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Gerando PIX...' : `Gerar PIX - ${planPrice}`}
                  </button>
                </div>
              </form>
            )}

            {selectedMethod === 'boleto' && (
              <form onSubmit={handleBoletoSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Pagamento via Boleto</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={boletoData.cpf}
                    onChange={(e) => setBoletoData({...boletoData, cpf: formatCPF(e.target.value)})}
                    placeholder="123.456.789-00"
                    maxLength={14}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={boletoData.nome}
                    onChange={(e) => setBoletoData({...boletoData, nome: e.target.value})}
                    placeholder="João da Silva"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email para envio do boleto
                  </label>
                  <input
                    type="email"
                    value={boletoData.email}
                    onChange={(e) => setBoletoData({...boletoData, email: e.target.value})}
                    placeholder="seu@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Como funciona:</strong><br />
                    1. Clique em "Gerar Boleto"<br />
                    2. O boleto será enviado para seu email<br />
                    3. Pague no banco ou app até a data de vencimento<br />
                    4. A confirmação pode levar até 2 dias úteis
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('method')}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Gerando Boleto...' : `Gerar Boleto - ${planPrice}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagamento;