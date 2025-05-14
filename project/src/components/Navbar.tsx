import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navy-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="text-gold-500">Loja</span>
            <span className="ml-1">Virtual</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-gold-400 transition-colors">Início</Link>
            <Link to="/produtos" className="hover:text-gold-400 transition-colors">Produtos</Link>
            <Link to="/sobre" className="hover:text-gold-400 transition-colors">Sobre</Link>
            <Link to="/contato" className="hover:text-gold-400 transition-colors">Contato</Link>
          </div>
          
          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center">
            <Link to="/carrinho" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6 text-white hover:text-gold-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-navy-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-900 py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 px-4 hover:bg-navy-700 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/produtos" 
              className="py-2 px-4 hover:bg-navy-700 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link 
              to="/sobre" 
              className="py-2 px-4 hover:bg-navy-700 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className="py-2 px-4 hover:bg-navy-700 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;