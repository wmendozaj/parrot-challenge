import React from 'react';
import CategoryList from './CategoryList';
import { Category } from '../redux/menuSlice';
import { CategoryWrapperContainer } from '../styles/CategoryStyles';

interface CategoryWrapperProps {
  categories: Category[];
  onProductStatusChange: (updatedProduct: any) => void;
}

const CategoryWrapper: React.FC<CategoryWrapperProps> = ({ categories, onProductStatusChange }) => (
  <CategoryWrapperContainer>
    {categories.map((category) => (
      <CategoryList key={category.uuid} category={category} onStatusChange={onProductStatusChange} />
    ))}
  </CategoryWrapperContainer>
);

export default CategoryWrapper;
