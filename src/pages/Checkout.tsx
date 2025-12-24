// src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Plan {
  nome: string;
  preco: string;
  recursos: string[];
}

interface CheckoutState {
  plan: Plan;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data states
  const [creditCard, setCreditCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1'
  });

  const [pix, setPix] = useState({
    cpf: '',
    name: ''
  });

  const [boleto, setBoleto] = useState({
    cpf: '',
    name: '',
    email: '',
    phone: ''
  });

  const checkoutState = location.state as CheckoutState | null;
  const selectedPlan = checkoutState?.plan;

  useEffect(() => {
    if (!selectedPlan) {
      navigate('/planos');
    }
  }, [selectedPlan, navigate]);

  if (!selectedPlan) {
    return null;
  }

  const validateCreditCard = () => {
    const newErrors: Record<string, string> = {};

    if (!creditCard.number.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.number = 'Número do cartão deve ter 16 dígitos';
    }

    if (!creditCard.name.trim()) {
      newErrors.name = 'Nome no cartão é obrigatório';
    }

    if (!creditCard.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Data de validade deve estar no formato MM/AA';
    }

    if (!creditCard.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV deve ter 3 ou 4 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePix = () => {
    const newErrors: Record<string, string> = {};

    if (!pix.cpf.match(/^\d{11}$/)) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }

    if (!pix.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBoleto = () => {
    const newErrors: Record<string, string> = {};

    if (!boleto.cpf.match(/^\d{11}$/)) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }

    if (!boleto.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!boleto.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email inválido';
    }

    if (!boleto.phone.match(/^\d{10,11}$/)) {
      newErrors.phone = 'Telefone deve ter 10 ou 11 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    const v = value.replace(/\D/g, '');
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

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 11) {
      if (v.length <= 10) {
        return v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let isValid = false;

    switch (paymentMethod) {
      case 'credit':
        isValid = validateCreditCard();
        break;
      case 'pix':
        isValid = validatePix();
        break;
      case 'boleto':
        isValid = validateBoleto();
        break;
    }

    if (!isValid) return;

    setIsProcessing(true);

    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Aqui seria integrada com uma API de pagamento real
      alert(`✅ Pagamento do plano ${selectedPlan.nome} processado com sucesso!\n\nMétodo: ${paymentMethod === 'credit' ? 'Cartão de Crédito' : paymentMethod === 'pix' ? 'Pix' : 'Boleto'}\n\nVocê será redirecionado para a página inicial.`);

      navigate('/');

    } catch (error) {
      setErrors({ general: 'Erro ao processar pagamento. Tente novamente.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCreditCardForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número do Cartão
        </label>
        <input
          type="text"
          value={creditCard.number}
          onChange={(e) => setCreditCard({...creditCard, number: formatCardNumber(e.target.value)})}
          placeholder="1234 5678 9012 3456"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={19}
        />
        {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome no Cartão
        </label>
        <input
          type="text"
          value={creditCard.name}
          onChange={(e) => setCreditCard({...creditCard, name: e.target.value.toUpperCase()})}
          placeholder="JOÃO DA SILVA"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Validade
          </label>
          <input
            type="text"
            value={creditCard.expiry}
            onChange={(e) => setCreditCard({...creditCard, expiry: formatExpiry(e.target.value)})}
            placeholder="MM/AA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={5}
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            value={creditCard.cvv}
            onChange={(e) => setCreditCard({...creditCard, cvv: e.target.value.replace(/\D/g, '')})}
            placeholder="123"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={4}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Parcelas
        </label>
        <select
          value={creditCard.installments}
          onChange={(e) => setCreditCard({...creditCard, installments: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">1x de R$ {selectedPlan.preco.replace('R$ ', '').replace('/mês', '')}</option>
          <option value="2">2x de R$ {(parseFloat(selectedPlan.preco.replace('R$ ', '').replace('/mês', '').replace(',', '.')) / 2).toFixed(2).replace('.', ',')}</option>
          <option value="3">3x de R$ {(parseFloat(selectedPlan.preco.replace('R$ ', '').replace('/mês', '').replace(',', '.')) / 3).toFixed(2).replace('.', ',')}</option>
        </select>
      </div>
    </div>
  );

  const renderPixForm = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">💰 Pagamento via Pix</h3>
        <p className="text-sm text-blue-700">
          Após confirmar os dados, será gerado um QR Code para pagamento instantâneo.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CPF
        </label>
        <input
          type="text"
          value={pix.cpf}
          onChange={(e) => setPix({...pix, cpf: formatCPF(e.target.value)})}
          placeholder="123.456.789-00"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={14}
        />
        {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          value={pix.name}
          onChange={(e) => setPix({...pix, name: e.target.value})}
          placeholder="João da Silva"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
    </div>
  );

  const renderBoletoForm = () => (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-purple-800 mb-2">📄 Pagamento via Boleto</h3>
        <p className="text-sm text-purple-700">
          O boleto será enviado por email. Prazo de compensação: 1-3 dias úteis.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CPF
        </label>
        <input
          type="text"
          value={boleto.cpf}
          onChange={(e) => setBoleto({...boleto, cpf: formatCPF(e.target.value)})}
          placeholder="123.456.789-00"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={14}
        />
        {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          value={boleto.name}
          onChange={(e) => setBoleto({...boleto, name: e.target.value})}
          placeholder="João da Silva"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={boleto.email}
          onChange={(e) => setBoleto({...boleto, email: e.target.value})}
          placeholder="joao@email.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          type="text"
          value={boleto.phone}
          onChange={(e) => setBoleto({...boleto, phone: formatPhone(e.target.value)})}
          placeholder="(11) 99999-9999"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={15}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/planos')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Voltar para Planos
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{selectedPlan.nome}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{selectedPlan.preco}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Recursos incluídos:</h4>
              <ul className="space-y-1">
                {selectedPlan.recursos.map((recurso, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {recurso}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">{selectedPlan.preco}</span>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Pagamento</h2>

            {/* Seletor de Método de Pagamento */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Método de Pagamento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'credit'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  💳 Cartão
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'pix'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  💰 Pix
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    paymentMethod === 'boleto'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  📄 Boleto
                </button>
              </div>
            </div>

            {/* Formulários */}
            <form onSubmit={handleSubmit}>
              {paymentMethod === 'credit' && renderCreditCardForm()}
              {paymentMethod === 'pix' && renderPixForm()}
              {paymentMethod === 'boleto' && renderBoletoForm()}

              {errors.general && (
                <p className="text-red-500 text-sm mt-4">{errors.general}</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  `Pagar ${selectedPlan.preco}`
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Seus dados estão seguros e criptografados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;