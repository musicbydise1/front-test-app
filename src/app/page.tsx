import Head from 'next/head';
import ClientProductList from './components/ClientProductList';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const HomePage = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const products: Product[] = data.products;

    return (
        <>
            <Head>
                <title>Product Store</title>
                <meta name="description" content="List of products available for purchase" />
            </Head>
            <ClientProductList products={products} />
        </>
    );
};

export default HomePage;
