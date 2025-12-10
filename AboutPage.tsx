import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ROUTES } from '../const';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: 'Alex Silva', role: 'Fundador & Criador de Conteúdo', avatar: '👨‍💻' },
    { name: 'Maria Santos', role: 'Editora Chefe', avatar: '👩‍🎬' },
    { name: 'Carlos Oliveira', role: 'Produtor de Games', avatar: '🎮' },
    { name: 'Fernanda Lima', role: 'Social Media Manager', avatar: '📱' },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Sobre o MasterPllays</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Somos uma plataforma dedicada a trazer o melhor conteúdo de entretenimento digital, 
          focando em games, vlogs e cultura pop para uma comunidade apaixonada.
        </p>
      </div>

      {/* Nossa História */}
      <Card className="p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Nossa História</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Fundado em 2020, o MasterPllays começou como um canal simples no YouTube, 
              compartilhando gameplays e experiências de um amante de jogos.
            </p>
            <p className="text-gray-700 mb-4">
              Com o crescimento da comunidade, expandimos para uma plataforma completa, 
              oferecendo não apenas vídeos, mas também notícias, reviews e um espaço para 
              outros criadores de conteúdo.
            </p>
            <p className="text-gray-700">
              Hoje, temos orgulho de ser uma das maiores comunidades de entretenimento 
              digital do Brasil, com milhões de visualizações mensais.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-8xl">
              🎮
            </div>
          </div>
        </div>
      </Card>

      {/* Nossa Equipe */}
      <h2 className="text-2xl font-bold mb-6">Conheça Nossa Equipe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {teamMembers.map((member, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">{member.avatar}</div>
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
          </Card>
        ))}
      </div>

      {/* Valores */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold mb-2">Qualidade</h3>
            <p className="text-gray-600">Produzimos conteúdo de alta qualidade sempre</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="font-bold mb-2">Comunidade</h3>
            <p className="text-gray-600">Nossa comunidade é nossa maior prioridade</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="font-bold mb-2">Inovação</h3>
            <p className="text-gray-600">Sempre buscando novas formas de entreter</p>
          </div>
        </div>
      </Card>

      {/* CTA Final */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Junte-se a Nós!</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Faça parte dessa comunidade incrível e tenha acesso a conteúdo exclusivo, 
          interações ao vivo e muito mais.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">
            <a href={ROUTES.AUTH}>Cadastrar-se Gratuitamente</a>
          </Button>
          <Button variant="secondary" size="lg">
            <a href={ROUTES.HOME}>Explorar Conteúdo</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
