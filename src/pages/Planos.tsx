import { useState } from 'react'

interface Plan {
  nome: string
  preco: string
  recursos: string[]
}

export default function Planos() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [showModal, setShowModal] = useState(false)

  const planos: Plan[] = [
    {
      nome: "Básico",
      preco: "R$ 19,90/mês",
      recursos: ["Acesso a vídeos básicos", "Qualidade SD", "1 tela simultânea"]
    },
    {
      nome: "Premium",
      preco: "R$ 39,90/mês",
      recursos: ["Acesso a todos os vídeos", "Qualidade Full HD", "3 telas simultâneas", "Conteúdo exclusivo"]
    },
    {
      nome: "Master",
      preco: "R$ 59,90/mês",
      recursos: ["Acesso a todos os vídeos", "Qualidade 4K", "Telas ilimitadas", "Conteúdo exclusivo", "Suporte prioritário"]
    }
  ]

  const handleChoosePlan = (plano: Plan) => {
    setSelectedPlan(plano)
    setShowModal(true)
  }

  const handlePayment = (method: string) => {
    if (selectedPlan) {
      alert(`Pagamento do plano ${selectedPlan.nome} via ${method} processado com sucesso!`)
      setShowModal(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Nossos Planos
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {planos.map((plano, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4">{plano.nome}</h2>
            <p className="text-3xl font-bold text-blue-600 mb-6">{plano.preco}</p>
            
            <ul className="space-y-3 mb-8">
              {plano.recursos.map((recurso, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {recurso}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleChoosePlan(plano)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Escolher Plano
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Todos os planos incluem acesso à nossa biblioteca completa de vídeos.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Escolher Método de Pagamento</h2>
            <p className="mb-6">Plano selecionado: <strong>{selectedPlan?.nome}</strong> - {selectedPlan?.preco}</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => handlePayment('Cartão de Crédito')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Pagar com Cartão de Crédito
              </button>
              
              <button 
                onClick={() => handlePayment('Pix')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Pagar com Pix
              </button>
              
              <button 
                onClick={() => handlePayment('Boleto')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Pagar com Boleto
              </button>
            </div>
            
            <button 
              onClick={() => setShowModal(false)}
              className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}