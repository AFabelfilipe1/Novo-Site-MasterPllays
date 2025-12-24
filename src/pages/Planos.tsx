export default function Planos() {
  const planos = [
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
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
    </div>
  )
}