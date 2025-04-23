import { Head } from '@inertiajs/react';

export default function Show({ product }) {
    return (
        <>
            <Head title={product.title} />
            <div>
                <div className="max-w-4xl mx-auto py-10">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                    <img
                        src={product.image ? `/storage/${product.image}` : 'https://via.placeholder.com/600x400'}
                        alt={product.title}
                        className="h-[400px] w-[300px] mb-4 rounded shadow"
                    />
                    <p className="text-gray-800">{product.description}</p>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}
