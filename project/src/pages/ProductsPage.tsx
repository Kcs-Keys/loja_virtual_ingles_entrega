import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useProductData } from '../hooks/useProductData';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';

const ProductsPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { 
    products: allProducts, 
    categories,
    getCategoryBySlug,
    getProductByCategorySlug,
    isLoading 
  } = useProductData();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [showDiscounted, setShowDiscounted] = useState(false);
  
  // Initialize category and products
  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryBySlug(categorySlug);
      if (category) {
        setSelectedCategory(category.id);
        const categoryProducts = getProductByCategorySlug(categorySlug);
        setProducts(categoryProducts);
      }
    } else {
      setSelectedCategory(null);
      setProducts(allProducts);
    }
  }, [categorySlug, allProducts, getCategoryBySlug, getProductByCategorySlug]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        product => product.categoryId === selectedCategory
      );
    }
    
    // Filter by price
    filteredProducts = filteredProducts.filter(
      product => {
        const productPrice = product.discount 
          ? product.price * (1 - product.discount / 100) 
          : product.price;
        return productPrice >= priceRange[0] && productPrice <= priceRange[1];
      }
    );
    
    // Filter discounted products
    if (showDiscounted) {
      filteredProducts = filteredProducts.filter(product => product.discount && product.discount > 0);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setProducts(filteredProducts);
  }, [allProducts, selectedCategory, priceRange, sortBy, showDiscounted]);
  
  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };
  
  const handlePriceChange = (value: number, index: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-navy-800"></div>
      </div>
    );
  }

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
              </li>
              {category && (
                <>
                  <span className="mx-2 text-gray-400">/</span>
                  <li className="text-navy-800 font-medium">{category.name}</li>
                </>
              )}
            </ul>
          </nav>
        </div>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {category ? category.name : 'Todos os Produtos'}
          </h1>
          {category && (
            <p className="text-gray-600 mt-2">{category.description}</p>
          )}
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilter}
            className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 w-full"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span>Filtros</span>
            {isFilterOpen ? (
              <ChevronUp className="h-5 w-5 ml-auto" />
            ) : (
              <ChevronDown className="h-5 w-5 ml-auto" />
            )}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 rounded border-gray-300 text-navy-800 focus:ring-navy-800"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Preço</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Min: R$ {priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Max: R$ {priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Discount Filter */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-discounted"
                    checked={showDiscounted}
                    onChange={() => setShowDiscounted(!showDiscounted)}
                    className="h-4 w-4 rounded border-gray-300 text-navy-800 focus:ring-navy-800"
                  />
                  <label htmlFor="show-discounted" className="ml-2 text-gray-700">
                    Mostrar apenas produtos com desconto
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Mostrando <span className="font-medium">{products.length}</span> produtos
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-600 mr-2">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border-gray-300 rounded-md text-gray-700 focus:ring-navy-800 focus:border-navy-800"
                >
                  <option value="rating-desc">Relevância</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">A-Z</option>
                  <option value="name-desc">Z-A</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros ou veja todos os produtos disponíveis.</p>
                <Link
                  to="/produtos"
                  className="mt-4 inline-block bg-navy-800 text-white px-4 py-2 rounded-md hover:bg-navy-700 transition-colors"
                >
                  Ver todos os produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;