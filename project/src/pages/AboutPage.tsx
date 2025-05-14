import React from 'react';
import { Users, Award, TrendingUp, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg" 
            alt="About Us" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
            <p className="text-xl mb-0">
              Conheça nossa história, missão e valores que nos tornam uma loja única.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg" 
                alt="Our Story" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-navy-800">Nossa História</h2>
              <p className="text-gray-700 mb-4">
                Fundada em 2010, a Loja Virtual nasceu do sonho de proporcionar uma experiência de compra única para nossos clientes. Começamos como uma pequena loja online e, ao longo dos anos, crescemos para nos tornar uma referência no mercado de e-commerce brasileiro.
              </p>
              <p className="text-gray-700 mb-4">
                Nossa jornada foi marcada por desafios, aprendizados e, acima de tudo, uma dedicação incansável para oferecer produtos de alta qualidade e um atendimento excepcional.
              </p>
              <p className="text-gray-700">
                Hoje, temos orgulho de atender milhares de clientes em todo o Brasil, mantendo sempre o mesmo compromisso com a qualidade e a satisfação que tínhamos quando demos os primeiros passos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-800">Missão, Visão e Valores</h2>
            <p className="text-gray-700">
              Os pilares que orientam nossas decisões e ações todos os dias.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">Missão</h3>
              <p className="text-gray-700">
                Proporcionar a melhor experiência de compra online, oferecendo produtos de alta qualidade a preços justos, com um atendimento personalizado e focado na satisfação total dos nossos clientes.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">Visão</h3>
              <p className="text-gray-700">
                Ser reconhecida como a principal referência em e-commerce no Brasil, inovando constantemente para oferecer a melhor experiência de compra online e expandir nosso impacto positivo na sociedade.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">Valores</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Excelência em tudo o que fazemos</li>
                <li>• Transparência em nossas relações</li>
                <li>• Compromisso com a satisfação do cliente</li>
                <li>• Inovação e melhoria contínua</li>
                <li>• Responsabilidade social e ambiental</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-800">Nossa Equipe</h2>
            <p className="text-gray-700">
              Conheça as pessoas que trabalham incansavelmente para tornar sua experiência de compra perfeita.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Carlos Silva',
                role: 'CEO & Fundador',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
              },
              {
                name: 'Ana Oliveira',
                role: 'Diretora de Operações',
                image: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg'
              },
              {
                name: 'Rafael Costa',
                role: 'Gerente de Marketing',
                image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg'
              },
              {
                name: 'Juliana Santos',
                role: 'Atendimento ao Cliente',
                image: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-navy-800">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-navy-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-navy-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-navy-800">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-navy-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossas Conquistas</h2>
            <p className="text-gray-300">
              Alguns números que mostram nossa trajetória de sucesso.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-3 text-gold-500">+25.000</div>
              <p className="text-xl">Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3 text-gold-500">+50.000</div>
              <p className="text-xl">Pedidos Entregues</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3 text-gold-500">5</div>
              <p className="text-xl">Categorias de Produtos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-3 text-gold-500">13</div>
              <p className="text-xl">Anos de História</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-800">O Que Nossos Clientes Dizem</h2>
            <p className="text-gray-700">
              A satisfação dos nossos clientes é nossa melhor recompensa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Sou cliente da Loja Virtual há 5 anos e nunca tive problemas. Produtos de alta qualidade e um atendimento excepcional. Recomendo a todos!",
                author: "Maria Santos",
                location: "São Paulo, SP"
              },
              {
                text: "Comprei um smartphone e fiquei impressionado com a rapidez da entrega e a qualidade do produto. Com certeza voltarei a comprar!",
                author: "Pedro Costa",
                location: "Rio de Janeiro, RJ"
              },
              {
                text: "O que mais me impressiona na Loja Virtual é a atenção aos detalhes. Desde o site, até a embalagem e o atendimento, tudo é perfeito.",
                author: "Fernanda Lima",
                location: "Belo Horizonte, MG"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4 text-yellow-400">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-navy-800">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;