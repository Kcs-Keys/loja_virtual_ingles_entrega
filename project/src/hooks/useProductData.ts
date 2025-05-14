import { useState, useEffect } from 'react';
import { Product, Category } from '../types';

// Mock data for categories
const categories: Category[] = [
  {
    id: 1,
    name: 'Eletrônicos',
    slug: 'eletronicos',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg',
    description: 'Os melhores eletrônicos para seu dia a dia. Smartphones, laptops, tablets e muito mais.'
  },
  {
    id: 2,
    name: 'Vestuário',
    slug: 'vestuario',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    description: 'Roupas de alta qualidade para todas as estações. Camisetas, jaquetas, calças e muito mais.'
  },
  {
    id: 3,
    name: 'Acessórios',
    slug: 'acessorios',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    description: 'Acessórios elegantes para completar seu visual. Bolsas, relógios, joias e muito mais.'
  },
  {
    id: 4,
    name: 'Casa & Decoração',
    slug: 'casa-decoracao',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    description: 'Produtos para deixar sua casa mais bonita e confortável. Móveis, decoração e utilidades.'
  },
  {
    id: 5,
    name: 'Esportes & Lazer',
    slug: 'esportes',
    image: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg',
    description: 'Tudo para sua prática esportiva e momentos de lazer. Equipamentos, roupas e acessórios esportivos.'
  }
];

// Mock data for products (10 products per category = 50 products total)
const products: Product[] = [
  // Eletrônicos (Category 1)
  {
    id: 1,
    name: 'Smartphone Premium X',
    price: 2499.99,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    description: 'Smartphone com câmera de alta resolução, processador potente e bateria de longa duração.',
    category: 'Eletrônicos',
    categoryId: 1,
    discount: 10,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Laptop Ultrafino',
    price: 4899.99,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    description: 'Laptop leve e potente com processador de última geração e tela de alta resolução.',
    category: 'Eletrônicos',
    categoryId: 1,
    discount: 5,
    featured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Fones de Ouvido Bluetooth',
    price: 349.99,
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
    description: 'Fones de ouvido sem fio com cancelamento de ruído e excelente qualidade de som.',
    category: 'Eletrônicos',
    categoryId: 1,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 4,
    name: 'Smart TV 55"',
    price: 3299.99,
    image: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg',
    description: 'Smart TV com resolução 4K, HDR e diversas opções de streaming.',
    category: 'Eletrônicos',
    categoryId: 1,
    discount: 15,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 5,
    name: 'Câmera DSLR Profissional',
    price: 5999.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'Câmera profissional com sensor de alta resolução e diversas opções de configuração.',
    category: 'Eletrônicos',
    categoryId: 1,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 6,
    name: 'Console de Videogame',
    price: 4499.99,
    image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg',
    description: 'Console de última geração com gráficos impressionantes e jogos exclusivos.',
    category: 'Eletrônicos',
    categoryId: 1,
    discount: 8,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 7,
    name: 'Tablet 10"',
    price: 1999.99,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    description: 'Tablet com tela de alta resolução, processador potente e bateria de longa duração.',
    category: 'Eletrônicos',
    categoryId: 1,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 8,
    name: 'Smartwatch Premium',
    price: 899.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    description: 'Relógio inteligente com diversas funções de monitoramento de saúde e notificações.',
    category: 'Eletrônicos',
    categoryId: 1,
    discount: 12,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 9,
    name: 'Alto-falante Bluetooth',
    price: 499.99,
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg',
    description: 'Alto-falante portátil com excelente qualidade de som e bateria de longa duração.',
    category: 'Eletrônicos',
    categoryId: 1,
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: 10,
    name: 'Drone com Câmera HD',
    price: 2999.99,
    image: 'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg',
    description: 'Drone com câmera de alta definição, estabilização de imagem e diversos modos de voo.',
    category: 'Eletrônicos',
    categoryId: 1,
    featured: true,
    inStock: true,
    rating: 4.7
  },
  
  // Vestuário (Category 2)
  {
    id: 11,
    name: 'Camiseta Básica',
    price: 59.99,
    image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg',
    description: 'Camiseta de algodão confortável e versátil para o dia a dia.',
    category: 'Vestuário',
    categoryId: 2,
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: 12,
    name: 'Jaqueta de Couro',
    price: 399.99,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
    description: 'Jaqueta de couro elegante e durável para qualquer ocasião.',
    category: 'Vestuário',
    categoryId: 2,
    discount: 15,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 13,
    name: 'Calça Jeans',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg',
    description: 'Calça jeans confortável e estilosa para o dia a dia.',
    category: 'Vestuário',
    categoryId: 2,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 14,
    name: 'Vestido Casual',
    price: 179.99,
    image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    description: 'Vestido leve e confortável para o dia a dia ou ocasiões casuais.',
    category: 'Vestuário',
    categoryId: 2,
    discount: 10,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 15,
    name: 'Blazer Elegante',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg',
    description: 'Blazer elegante para ocasiões formais ou ambiente de trabalho.',
    category: 'Vestuário',
    categoryId: 2,
    featured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: 16,
    name: 'Suéter de Lã',
    price: 199.99,
    image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg',
    description: 'Suéter de lã quente e confortável para os dias frios.',
    category: 'Vestuário',
    categoryId: 2,
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: 17,
    name: 'Shorts Esportivo',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg',
    description: 'Shorts leve e confortável para a prática de esportes.',
    category: 'Vestuário',
    categoryId: 2,
    discount: 5,
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: 18,
    name: 'Camisa Social',
    price: 149.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    description: 'Camisa social elegante para ocasiões formais ou ambiente de trabalho.',
    category: 'Vestuário',
    categoryId: 2,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 19,
    name: 'Pijama Confortável',
    price: 99.99,
    image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
    description: 'Pijama confortável para noites de sono tranquilas.',
    category: 'Vestuário',
    categoryId: 2,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 20,
    name: 'Sobretudo Elegante',
    price: 449.99,
    image: 'https://images.pexels.com/photos/1816551/pexels-photo-1816551.jpeg',
    description: 'Sobretudo elegante e quente para os dias frios.',
    category: 'Vestuário',
    categoryId: 2,
    discount: 20,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  
  // Acessórios (Category 3)
  {
    id: 21,
    name: 'Relógio de Pulso',
    price: 299.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    description: 'Relógio elegante e durável para completar seu visual.',
    category: 'Acessórios',
    categoryId: 3,
    discount: 10,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 22,
    name: 'Colar de Prata',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    description: 'Colar de prata elegante para ocasiões especiais.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 23,
    name: 'Bolsa de Couro',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    description: 'Bolsa de couro elegante e espaçosa para o dia a dia.',
    category: 'Acessórios',
    categoryId: 3,
    discount: 15,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 24,
    name: 'Óculos de Sol',
    price: 179.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
    description: 'Óculos de sol estiloso com proteção UV.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 25,
    name: 'Carteira de Couro',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2079223/pexels-photo-2079223.jpeg',
    description: 'Carteira de couro elegante e funcional.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 26,
    name: 'Cinto de Couro',
    price: 99.99,
    image: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg',
    description: 'Cinto de couro elegante e durável.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: 27,
    name: 'Pulseira de Prata',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    description: 'Pulseira de prata elegante para ocasiões especiais.',
    category: 'Acessórios',
    categoryId: 3,
    discount: 5,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 28,
    name: 'Chapéu Estiloso',
    price: 89.99,
    image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg',
    description: 'Chapéu estiloso para completar seu visual.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: 29,
    name: 'Mochila Casual',
    price: 229.99,
    image: 'https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg',
    description: 'Mochila casual e espaçosa para o dia a dia.',
    category: 'Acessórios',
    categoryId: 3,
    discount: 10,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 30,
    name: 'Luvas de Inverno',
    price: 69.99,
    image: 'https://images.pexels.com/photos/45057/pexels-photo-45057.jpeg',
    description: 'Luvas quentes e confortáveis para os dias frios.',
    category: 'Acessórios',
    categoryId: 3,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  
  // Casa & Decoração (Category 4)
  {
    id: 31,
    name: 'Conjunto de Panelas',
    price: 599.99,
    image: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
    description: 'Conjunto de panelas de alta qualidade para sua cozinha.',
    category: 'Casa & Decoração',
    categoryId: 4,
    discount: 15,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 32,
    name: 'Luminária de Mesa',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    description: 'Luminária de mesa elegante para seu escritório ou quarto.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 33,
    name: 'Vaso Decorativo',
    price: 129.99,
    image: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg',
    description: 'Vaso decorativo elegante para sua sala de estar.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 34,
    name: 'Jogo de Cama',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
    description: 'Jogo de cama confortável e elegante para seu quarto.',
    category: 'Casa & Decoração',
    categoryId: 4,
    discount: 10,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 35,
    name: 'Tapete Decorativo',
    price: 299.99,
    image: 'https://images.pexels.com/photos/6045083/pexels-photo-6045083.jpeg',
    description: 'Tapete decorativo elegante para sua sala de estar.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 36,
    name: 'Conjunto de Copos',
    price: 149.99,
    image: 'https://images.pexels.com/photos/1395325/pexels-photo-1395325.jpeg',
    description: 'Conjunto de copos elegantes para suas bebidas.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 37,
    name: 'Quadro Decorativo',
    price: 179.99,
    image: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg',
    description: 'Quadro decorativo elegante para sua parede.',
    category: 'Casa & Decoração',
    categoryId: 4,
    discount: 5,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 38,
    name: 'Conjunto de Talheres',
    price: 399.99,
    image: 'https://images.pexels.com/photos/271715/pexels-photo-271715.jpeg',
    description: 'Conjunto de talheres elegantes para sua mesa.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 39,
    name: 'Almofada Decorativa',
    price: 79.99,
    image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
    description: 'Almofada decorativa confortável para seu sofá.',
    category: 'Casa & Decoração',
    categoryId: 4,
    featured: false,
    inStock: true,
    rating: 4.4
  },
  {
    id: 40,
    name: 'Relógio de Parede',
    price: 149.99,
    image: 'https://images.pexels.com/photos/707582/pexels-photo-707582.jpeg',
    description: 'Relógio de parede elegante para sua casa.',
    category: 'Casa & Decoração',
    categoryId: 4,
    discount: 10,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  
  // Esportes & Lazer (Category 5)
  {
    id: 41,
    name: 'Bicicleta Ergométrica',
    price: 1999.99,
    image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg',
    description: 'Bicicleta ergométrica para exercícios em casa.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    discount: 20,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 42,
    name: 'Bola de Futebol',
    price: 149.99,
    image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
    description: 'Bola de futebol profissional para suas partidas.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 43,
    name: 'Raquete de Tênis',
    price: 299.99,
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    description: 'Raquete de tênis profissional para suas partidas.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    discount: 10,
    featured: false,
    inStock: true,
    rating: 4.8
  },
  {
    id: 44,
    name: 'Esteira Elétrica',
    price: 2999.99,
    image: 'https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg',
    description: 'Esteira elétrica para exercícios em casa.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: 45,
    name: 'Kit de Yoga',
    price: 199.99,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
    description: 'Kit completo para prática de yoga em casa.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 46,
    name: 'Corda de Pular',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1753139/pexels-photo-1753139.jpeg',
    description: 'Corda de pular para exercícios cardio.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: 47,
    name: 'Halteres',
    price: 179.99,
    image: 'https://images.pexels.com/photos/949128/pexels-photo-949128.jpeg',
    description: 'Conjunto de halteres para musculação em casa.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    discount: 5,
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: 48,
    name: 'Prancha de Surf',
    price: 999.99,
    image: 'https://images.pexels.com/photos/757133/pexels-photo-757133.jpeg',
    description: 'Prancha de surf profissional para suas aventuras no mar.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: 49,
    name: 'Patins',
    price: 349.99,
    image: 'https://images.pexels.com/photos/2005992/pexels-photo-2005992.jpeg',
    description: 'Patins profissionais para suas aventuras.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    featured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: 50,
    name: 'Mochila de Trilha',
    price: 399.99,
    image: 'https://images.pexels.com/photos/1374674/pexels-photo-1374674.jpeg',
    description: 'Mochila resistente e espaçosa para suas trilhas e caminhadas.',
    category: 'Esportes & Lazer',
    categoryId: 5,
    discount: 15,
    featured: false,
    inStock: true,
    rating: 4.8
  }
];

export function useProductData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };
  
  const getProductsByCategory = (categoryId: number) => {
    return products.filter(product => product.categoryId === categoryId);
  };
  
  const getProductByCategorySlug = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    if (!category) return [];
    return products.filter(product => product.categoryId === category.id);
  };
  
  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };
  
  const getCategories = () => {
    return categories;
  };
  
  const getCategory = (id: number) => {
    return categories.find(category => category.id === id);
  };
  
  const getCategoryBySlug = (slug: string) => {
    return categories.find(category => category.slug === slug);
  };
  
  const getDiscountedProducts = () => {
    return products.filter(product => product.discount && product.discount > 0);
  };
  
  const getNewArrivals = () => {
    // For demo purposes, we'll just return some random products
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  };
  
  return {
    products,
    categories,
    isLoading,
    error,
    getFeaturedProducts,
    getProductsByCategory,
    getProductByCategorySlug,
    getProduct,
    getCategories,
    getCategory,
    getCategoryBySlug,
    getDiscountedProducts,
    getNewArrivals
  };
}