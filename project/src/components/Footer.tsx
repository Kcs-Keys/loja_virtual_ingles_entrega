import React from 'react';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-400">Loja Virtual</h3>
            <p className="text-gray-300 mb-4">
              Oferecemos produtos de alta qualidade para atender todas as suas necessidades. 
              Nossa missão é proporcionar a melhor experiência de compra online.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-400">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/produtos" className="text-gray-300 hover:text-gold-400 transition-colors">Produtos</Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-gold-400 transition-colors">Sobre</Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-gold-400 transition-colors">Contato</Link>
              </li>
              <li>
                <Link to="/carrinho" className="text-gray-300 hover:text-gold-400 transition-colors">Carrinho</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-400">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos/eletronicos" className="text-gray-300 hover:text-gold-400 transition-colors">Eletrônicos</Link>
              </li>
              <li>
                <Link to="/produtos/vestuario" className="text-gray-300 hover:text-gold-400 transition-colors">Vestuário</Link>
              </li>
              <li>
                <Link to="/produtos/acessorios" className="text-gray-300 hover:text-gold-400 transition-colors">Acessórios</Link>
              </li>
              <li>
                <Link to="/produtos/casa-decoracao" className="text-gray-300 hover:text-gold-400 transition-colors">Casa & Decoração</Link>
              </li>
              <li>
                <Link to="/produtos/esportes" className="text-gray-300 hover:text-gold-400 transition-colors">Esportes & Lazer</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gold-400">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Av. Paulista, 1000, São Paulo - SP, Brasil</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-2" />
                <span className="text-gray-300">(11) 5555-5555</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-2" />
                <span className="text-gray-300">contato@lojavirtual.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Loja Virtual. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;