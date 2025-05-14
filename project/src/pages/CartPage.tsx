import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Link 
            to="/produtos" 
            className="bg-navy-800 text-white px-6 py-3 rounded-md hover:bg-navy-700 transition-colors"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      
      <div className="lg:flex lg:gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Itens no Carrinho ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span>Limpar Carrinho</span>
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => {
                const discountedPrice = item.product.discount 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;
                
                return (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            <Link to={`/produto/${item.product.id}`} className="hover:text-navy-800">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 mb-4">
                            Categoria: {item.product.category}
                          </p>
                        </div>
                        <div className="mb-4 sm:mb-0">
                          {item.product.discount ? (
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-bold">
                                R$ {(discountedPrice * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                R$ {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-8 w-8 rounded-l-md flex items-center justify-center"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="h-8 w-12 border-y border-gray-300 text-center"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-8 w-8 rounded-r-md flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <Link 
                to="/produtos" 
                className="text-navy-800 hover:text-navy-600 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Continuar Comprando</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">
                    {totalPrice >= 299.99 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      "R$ 19.99"
                    )}
                  </span>
                </div>
                
                {totalPrice < 299.99 && (
                  <div className="text-sm text-gray-600 mt-2">
                    Falta <span className="font-semibold">R$ {(299.99 - totalPrice).toFixed(2)}</span> para frete grátis
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      R$ {(totalPrice + (totalPrice >= 299.99 ? 0 : 19.99)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full bg-navy-800 hover:bg-navy-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Entrega para todo o Brasil</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Pagamento seguro</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Garantia de satisfação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;