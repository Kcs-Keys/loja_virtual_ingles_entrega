import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <Link to={`/produto/${product.id}`}>
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-md">
              -{product.discount}%
            </span>
          )}
          {product.featured && !product.discount && (
            <span className="absolute top-2 right-2 bg-gold-500 text-navy-800 px-2 py-1 text-xs font-bold rounded-md">
              Destaque
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="mb-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              {product.discount ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-800">
                    R$ {discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  R$ {product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${
                      star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          {showAddToCart && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center bg-navy-800 text-white py-2 px-4 rounded-md hover:bg-navy-700 transition-colors w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Comprar</span>
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;