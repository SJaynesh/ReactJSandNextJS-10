import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);

    useEffect(() => {
        getAllProductData();
    }, []);

    const getAllProductData = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200 mb-10">
                <div className="max-w-7xl mx-auto py-12 px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Featured <span className="text-indigo-600">Products</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Explore our latest collection of high-quality items curated just for you.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allProducts.map((product, index) => (
                        <div
                            key={product.id || index}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <img
                                    src={product.p_image}
                                    alt={product.p_name}
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm border border-gray-100">
                                        {product.p_category}
                                    </span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="mb-2">
                                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                        {product.p_name}
                                    </h2>
                                </div>

                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                                    {product.p_description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-semibold">Price</span>
                                        <span className="text-xl font-black text-gray-900">₹{Number(product.p_price).toLocaleString()}</span>
                                    </div>

                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {allProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No products available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}