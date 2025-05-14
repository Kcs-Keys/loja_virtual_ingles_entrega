import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would submit the form data to your server here
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg" 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-xl mb-0">
              Estamos aqui para responder suas dúvidas e ouvir seus comentários.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">Endereço</h3>
              <p className="text-gray-700">
                Av. Paulista, 1000<br />
                Bela Vista, São Paulo - SP<br />
                CEP: 01310-100
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">Telefone</h3>
              <p className="text-gray-700">
                Central de Atendimento:<br />
                (11) 5555-5555<br />
                Suporte Técnico:<br />
                (11) 5555-5556
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-navy-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-800">E-mail</h3>
              <p className="text-gray-700">
                Atendimento ao Cliente:<br />
                atendimento@lojavirtual.com<br />
                Suporte Técnico:<br />
                suporte@lojavirtual.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-800">Envie uma Mensagem</h2>
            <p className="text-gray-700">
              Preencha o formulário abaixo e entraremos em contato o mais breve possível.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-1/2">
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-8 mb-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h3 className="text-lg font-semibold">Mensagem enviada com sucesso!</h3>
                  </div>
                  <p>
                    Agradecemos seu contato. Nossa equipe responderá sua mensagem em até 24 horas úteis.
                  </p>
                  <button 
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 shadow-md">
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="seu.email@exemplo.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="Dúvida sobre Produto">Dúvida sobre Produto</option>
                      <option value="Informações de Pedido">Informações de Pedido</option>
                      <option value="Reclamação">Reclamação</option>
                      <option value="Elogio">Elogio</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 ${
                        formErrors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Digite sua mensagem aqui..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-navy-800 hover:bg-navy-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Map and Business Hours */}
            <div className="lg:w-1/2">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976956435657!2d-46.6547612!3d-23.5632956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1sen!2sbr!4v1651231222222!5m2!1sen!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Loja Virtual - Localização"
                ></iframe>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 shadow-md">
                <div className="flex items-center mb-6">
                  <Clock className="h-6 w-6 text-navy-800 mr-3" />
                  <h3 className="text-xl font-bold text-navy-800">Horário de Funcionamento</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Segunda a Sexta</span>
                    <span className="font-medium">09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sábado</span>
                    <span className="font-medium">10:00 - 15:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Domingo e Feriados</span>
                    <span className="font-medium">Fechado</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-3">
                    <MessageSquare className="h-5 w-5 text-navy-800 mr-3" />
                    <h4 className="font-semibold text-navy-800">Chat Online</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Nosso chat online está disponível durante o horário comercial para atendimento imediato.
                  </p>
                  <button className="bg-navy-800 hover:bg-navy-700 text-white py-2 px-4 rounded-md transition-colors">
                    Iniciar Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-800">Perguntas Frequentes</h2>
            <p className="text-gray-700">
              Encontre respostas para as dúvidas mais comuns dos nossos clientes.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Qual o prazo de entrega dos produtos?",
                  answer: "O prazo de entrega varia de acordo com a sua localização. Em geral, produtos em estoque são enviados em até 24 horas após a confirmação do pagamento. O prazo de entrega estimado é informado no momento da compra."
                },
                {
                  question: "Como posso rastrear meu pedido?",
                  answer: "Após o envio do seu pedido, você receberá um e-mail com o código de rastreamento. Basta acessar sua conta em nosso site e ir na seção 'Meus Pedidos' para acompanhar o status da entrega."
                },
                {
                  question: "Quais são as formas de pagamento aceitas?",
                  answer: "Aceitamos cartões de crédito de todas as bandeiras, boleto bancário, PIX e transferência bancária. Para compras parceladas, oferecemos opções de até 12x sem juros, dependendo do valor total da compra."
                },
                {
                  question: "Como funciona a política de trocas e devoluções?",
                  answer: "Você tem até 7 dias após o recebimento do produto para solicitar a troca ou devolução. O produto deve estar em perfeito estado, na embalagem original e com todos os acessórios. Para mais detalhes, consulte nossa política completa na seção 'Trocas e Devoluções'."
                },
                {
                  question: "Vocês oferecem frete grátis?",
                  answer: "Sim, oferecemos frete grátis para compras acima de R$ 299,99 para todo o Brasil. Promoções especiais de frete podem estar disponíveis periodicamente, fique atento às nossas comunicações."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-navy-800">
                    {faq.question}
                    <svg className="h-5 w-5 text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-6 pt-0 text-gray-700 border-t border-gray-200">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;