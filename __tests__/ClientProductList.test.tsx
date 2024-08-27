import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/cartSlice';
import ClientProductList from '../src/app/components/ClientProductList';

const mockProducts = [
    {
        id: 1,
        title: 'Test Product 1',
        description: 'Description 1',
        price: 10,
        rating: 4.5,
        thumbnail: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Test Product 2',
        description: 'Description 2',
        price: 20,
        rating: 3.5,
        thumbnail: 'https://via.placeholder.com/150',
    },
];

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
    });

    return render(<Provider store={store}>{ui}</Provider>);
};

describe('ClientProductList', () => {
    test('renders products and handles add to cart', () => {
        renderWithProviders(<ClientProductList products={mockProducts} />);

        // Проверяем, что продукты отображаются
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();

        // Проверяем добавление товара в корзину
        const addToCartButtons = screen.getAllByText('Add to Cart');
        fireEvent.click(addToCartButtons[0]);

        expect(screen.getByText(/Total Items: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test Product 1/)).toBeInTheDocument();
    });

    test('filters and sorts products', () => {
        renderWithProviders(<ClientProductList products={mockProducts} />);

        // Вводим текст в поле поиска
        fireEvent.change(screen.getByPlaceholderText('Search products...'), {
            target: { value: 'Product 1' },
        });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();

        // Меняем сортировку
        fireEvent.change(screen.getByDisplayValue('Sort by Price'), {
            target: { value: 'rating' },
        });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
});
