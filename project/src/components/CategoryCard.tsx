import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/produtos/${category.slug}`}
      className="block group"
    >
      <div className="relative h-64 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-1">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;