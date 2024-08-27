"use client";

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem } from '@/store/cartSlice';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const ClientProductList = ({ products }: { products: Product[] }) => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<'price' | 'rating'>('price');
    const [lastAddedItems, setLastAddedItems] = useState<{ id: number; title: string; count: number }[]>([]);
    const itemsPerPage = 10;

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

    const displayedProducts = useMemo(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption === 'price') {
            return filteredProducts.sort((a, b) => a.price - b.price).slice(0, itemsPerPage * page);
        } else if (sortOption === 'rating') {
            return filteredProducts.sort((a, b) => b.rating - a.rating).slice(0, itemsPerPage * page);
        }

        return filteredProducts.slice(0, itemsPerPage * page);
    }, [products, searchQuery, sortOption, page, itemsPerPage]);

    const handleAddToCart = useCallback((product: Product) => {
        dispatch(addItem(product));

        setLastAddedItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevItems, { id: product.id, title: product.title, count: 1 }];
            }
        });
    }, [dispatch]);

    const loadMoreProducts = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    const isAllProductsLoaded = displayedProducts.length >= products.length;

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/2 mb-4 md:mb-0 text-gray-800"
                    />
                    <div className="relative w-full md:w-auto">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as 'price' | 'rating')}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-auto appearance-none pr-8 text-gray-800"
                        >
                            <option value="price">Sort by Price</option>
                            <option value="rating">Sort by Rating</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                    {displayedProducts.map((product, index) => (
                        <div key={product.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="relative w-full h-64 mb-4">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="rounded-lg object-cover"
                                    priority={index < 3} // Добавлен приоритет для первых трех изображений
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {product.description.substring(0, 100)}...
                            </p>
                            <p className="text-xl font-bold text-blue-600 mb-4">
                                ${product.price.toFixed(2)}
                            </p>
                            <div className="flex items-center mb-4">
                                <span className="text-yellow-500">
                                    {'★'.repeat(Math.round(product.rating))}
                                </span>
                                <span className="ml-2 text-gray-600">{product.rating} / 5</span>
                            </div>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                {!isAllProductsLoaded && (
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={loadMoreProducts}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg transition-colors duration-300"
                        >
                            Load More
                        </button>
                    </div>
                )}
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
                    <span>
                        Total Items: {cartItems.length}
                        {lastAddedItems.length > 0 && (
                            <>
                                {' ('}
                                {lastAddedItems.map((item, index) => (
                                    <span key={item.id}>
                                        {item.title}
                                        {item.count > 1 && ` (${item.count})`}
                                        {index < lastAddedItems.length - 1 && ', '}
                                    </span>
                                ))}
                                {')'}
                            </>
                        )}
                    </span>
                    <span>Total Amount: ${totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default ClientProductList;
