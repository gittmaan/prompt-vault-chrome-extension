import React from 'react';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => (
  <div id="category-list">
    {categories.map((category) => (
      <span
        key={category}
        className="category-pill"
        style={{
          backgroundColor: selectedCategory === category ? '#8f369b' : '',
          color: selectedCategory === category ? 'white' : '',
        }}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </span>
    ))}
  </div>
);