import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Truck, Shield, ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { useProductData } from '../hooks/useProductData';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProduct, getProductsByCategory, isLoading } = useProductData();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  
  const product = getProduct(Number(productId));
  const relatedProducts = product 
    ? getProductsByCategory(product.categoryId).filter(p => p.id !== product.id).slice(0, 4) 
    : [];
  
  useEffect(() => {
    // Reset quantity when product changes
    setQuantity(1);
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-navy-800"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <p className="mb-6">O produto que você está procurando não existe ou foi removido.</p>
        <Link 
          to="/produtos"
          className="bg-navy-800 text-white px-6 py-2 rounded-md hover:bg-navy-700 transition-colors"
        >
          Ver todos os produtos
        </Link>
      </div>
    );
  }
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm breadcrumbs">
            <ul className="flex">
              <li>
                <Link to="/" className="text-gray-500 hover:text-navy-800">Início</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li>
                <Link to="/produtos" className="text-gray-500 hover:text-navy-800">Produtos</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li>
                <Link to={`/produtos/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-navy-800">
                  {product.category}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-navy-800 font-medium truncate max-w-xs">{product.name}</li>
            </ul>
          </nav>
          
          <Link to="/produtos" className="inline-flex items-center text-navy-800 hover:text-navy-600 mt-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Voltar para produtos</span>
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-80 md:h-96 lg:h-[32rem]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                {product.discount && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-md">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= product.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating} de 5</span>
              </div>
              
              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-800">
                      R$ {discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-3">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-800">
                    R$ {product.price.toFixed(2)}
                  </span>
                )}
                
                {product.inStock ? (
                  <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Em estoque
                  </span>
                ) : (
                  <span className="inline-block mt-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Fora de estoque
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-l-md flex items-center justify-center"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="h-10 w-16 border-y border-gray-300 text-center"
                  />
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-r-md flex items-center justify-center"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-navy-800 hover:bg-navy-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </button>
                <button
                  className="flex-1 border border-navy-800 text-navy-800 hover:bg-navy-50 py-3 px-4 rounded-md flex items-center justify-center transition-colors"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Adicionar à Lista de Desejos
                </button>
              </div>
              
              {/* Delivery and Safety */}
              <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-navy-800 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">Entrega Grátis</h3>
                    <p className="text-sm text-gray-600">Para compras acima de R$ 299,99</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-navy-800 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">Garantia de 12 meses</h3>
                    <p className="text-sm text-gray-600">Contra defeitos de fabricação</p>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <span className="text-gray-700 mr-3">Compartilhar:</span>
                  <div className="flex space-x-2">
                    <button className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1.02-1.1h3.2V.5h-4.4C10.4.5 9.3 2.5 9.3 5.3v2.16H6.16v3.9H9.3V20.5h5.2V11.36h3.5l.45-3.9z"></path>
                      </svg>
                    </button>
                    <button className="h-8 w-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"></path>
                      </svg>
                    </button>
                    <button className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.35 11.1h-9.17v2.73h6.5c-.33 3.8-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.1 0-1.15-.15-1.8-.15-1.8z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-navy-800 text-navy-800'
                    : 'text-gray-500 hover:text-navy-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Descrição
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-navy-800 text-navy-800'
                    : 'text-gray-500 hover:text-navy-600'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Detalhes
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-navy-800 text-navy-800'
                    : 'text-gray-500 hover:text-navy-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Avaliações
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-gray-700 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                    Sed euismod, nisl sit amet aliquam lacinia, nisl nisl aliquam nisl, 
                    eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl sit amet aliquam lacinia, 
                    nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  </p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Especificações do Produto</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="font-medium w-40">Categoria:</span>
                      <span>{product.category}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-40">Em Estoque:</span>
                      <span>{product.inStock ? 'Sim' : 'Não'}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-40">Garantia:</span>
                      <span>12 meses</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-40">Avaliação:</span>
                      <span>{product.rating} de 5</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-40">ID do Produto:</span>
                      <span>{product.id}</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-gray-800">{product.rating}</div>
                      <div className="flex text-yellow-400 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= product.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Baseado em 24 avaliações</div>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center mb-1">
                          <span className="text-sm text-gray-700 w-8">{rating} ★</span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                            <div 
                              className="h-3 bg-yellow-400 rounded-full" 
                              style={{ width: `${rating * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700 w-8">{rating * 20}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Avaliações dos Clientes</h3>
                    
                    <div className="space-y-6">
                      {/* Sample reviews */}
                      {[
                        {
                          name: 'Ana Silva',
                          date: '10/01/2023',
                          rating: 5,
                          comment: 'Excelente produto! Superou minhas expectativas. Recomendo a todos.'
                        },
                        {
                          name: 'Carlos Oliveira',
                          date: '15/12/2022',
                          rating: 4,
                          comment: 'Muito bom, só achei um pouco caro. Mas a qualidade é inegável.'
                        },
                        {
                          name: 'Mariana Costa',
                          date: '02/11/2022',
                          rating: 5,
                          comment: 'Produto perfeito e entrega rápida. Certamente comprarei novamente!'
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-800">{review.name}</h4>
                              <div className="flex text-yellow-400 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;