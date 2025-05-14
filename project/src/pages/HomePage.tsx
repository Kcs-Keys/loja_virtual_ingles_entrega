import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useProductData } from '../hooks/useProductData';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const HomePage: React.FC = () => {
  const { 
    getFeaturedProducts, 
    getCategories,
    getDiscountedProducts,
    isLoading
  } = useProductData();

  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const categories = getCategories();
  const discountedProducts = getDiscountedProducts().slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-navy-800"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubra produtos incríveis para o seu estilo</h1>
            <p className="text-xl mb-8">
              Oferecemos uma ampla variedade de produtos de alta qualidade para atender todas as suas necessidades.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/produtos" 
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-6 rounded-md transition-colors"
              >
                Ver Produtos
              </Link>
              <Link 
                to="/sobre" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Conheça-nos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Categorias</h2>
            <Link to="/produtos" className="text-navy-800 hover:text-navy-600 flex items-center font-medium">
              Ver todas
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-gold-500" />
              <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
            </div>
            <Link to="/produtos" className="text-navy-800 hover:text-navy-600 flex items-center font-medium">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="py-12 bg-gold-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-navy-900 mb-2">Grandes Descontos</h2>
              <p className="text-navy-800 text-lg">
                Aproveite nossas promoções especiais com até 30% de desconto em produtos selecionados!
              </p>
            </div>
            <Link 
              to="/produtos" 
              className="bg-navy-800 hover:bg-navy-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>
      </section>

      {/* Discounted Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produtos com Desconto</h2>
            <Link to="/produtos" className="text-navy-800 hover:text-navy-600 flex items-center font-medium">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-navy-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Inscreva-se em nossa Newsletter</h2>
            <p className="text-lg text-gray-300 mb-8">
              Receba em primeira mão nossas ofertas exclusivas e novidades.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-6 rounded-md transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;