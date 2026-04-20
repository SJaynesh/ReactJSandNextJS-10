import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<productFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    const navigate = useNavigate();

    const totalItems = allProducts.length; // totalItems = 51
    const totalPages = Math.ceil(totalItems / itemPerPage); // totalPages = 51 / 10 = 5.1 = 6

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;


    console.log("Total Item : ", totalItems);
    console.log("Total Pages : ", totalPages);
    console.log("Start Index : ", startIndex); // 0
    console.log("End Index : ", endIndex); // 10

    const currentProducts = allProducts.slice(startIndex, endIndex);

    console.log("Current Products : ", currentProducts);
    console.log("Total : ", [...Array(totalPages)]); // []



    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const allProductData = await fetchAllProducts();
        setAllProduct(allProductData);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Product Inventory</h1>
                    <p className="text-slate-500 text-sm">Manage your catalog and stock levels</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-sm">Total Products: </span>
                    <span className="font-bold text-indigo-600">{currentProducts.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">No.</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Product</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Description</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <tr key={product.id || index} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-400">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.p_image}
                                                    alt={product.p_name}
                                                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                                                />
                                                <span className="font-semibold text-slate-800">{product.p_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {product.p_category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                            ${Number(product.p_price).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${product.p_stock < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                                                {product.p_stock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-500 max-w-[200px] truncate" title={product.p_description}>
                                                {product.p_description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => navigate(`/edit-product/${product.id}`)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                                        No products found in the inventory.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <button onClick={() => { }} className={`ml-1 px-3 py-1 border rounded `}>{"<"}</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button onClick={() => setCurrentPage(index + 1)} className={`ml-1 px-3 py-1 border rounded ${(currentPage === index + 1) ? 'bg-indigo-500 text-white' : 'border-gray-500'}`}>{index + 1}</button>
                ))}
                <button onClick={() => { }} className={`ml-1 px-3 py-1 border rounded `}>{">"}</button>


                <select name="" id="" onChange={(event) => {
                    setItemPerPage(Number(event.target.value));
                    setCurrentPage(1);
                }}  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    );
}