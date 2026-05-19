// components/Products/ViewProducts.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, ChevronRight } from "lucide-react";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    categoryName: string;
    subCategoryName: string;
    extraCategoryName: string;
    status: 'active' | 'inactive';
    createdAt: string;
}

export default function ViewProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockProducts: Product[] = [
                {
                    id: "1",
                    name: "iPhone 15 Pro",
                    description: "Latest Apple smartphone with A17 chip",
                    price: 999.99,
                    stock: 45,
                    sku: "APP-IP15P-001",
                    categoryName: "Electronics",
                    subCategoryName: "Smartphones",
                    extraCategoryName: "Premium Smartphones",
                    status: "active",
                    createdAt: "2024-01-15"
                },
                {
                    id: "2",
                    name: "Samsung Galaxy S24",
                    description: "Android flagship with AI features",
                    price: 899.99,
                    stock: 32,
                    sku: "SAM-GS24-002",
                    categoryName: "Electronics",
                    subCategoryName: "Smartphones",
                    extraCategoryName: "Premium Smartphones",
                    status: "active",
                    createdAt: "2024-01-20"
                },
                {
                    id: "3",
                    name: "Gaming Laptop",
                    description: "High-performance gaming laptop",
                    price: 1499.99,
                    stock: 15,
                    sku: "GAM-LAP-003",
                    categoryName: "Electronics",
                    subCategoryName: "Laptops",
                    extraCategoryName: "Gaming Laptops",
                    status: "active",
                    createdAt: "2024-02-10"
                },
                {
                    id: "4",
                    name: "Men's Denim Jacket",
                    description: "Classic blue denim jacket",
                    price: 79.99,
                    stock: 120,
                    sku: "CLO-MDJ-004",
                    categoryName: "Clothing",
                    subCategoryName: "Men's Clothing",
                    extraCategoryName: "Casual Wear",
                    status: "inactive",
                    createdAt: "2024-03-05"
                }
            ];
            setProducts(mockProducts);
            setLoading(false);
        }, 1000);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || product.status === filterStatus;
        const matchesCategory = selectedCategory === "all" || product.categoryName === selectedCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const categories = [...new Set(products.map(p => p.categoryName))];

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(product => product.id !== id));
            alert("Product deleted successfully!");
        }
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setShowDetailsModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">View Products</h1>
                <p className="text-gray-600 mt-2">Manage and monitor all products in inventory</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Active Products</p>
                    <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Value</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Low Stock Items</p>
                    <p className="text-2xl font-bold text-orange-600">{products.filter(p => p.stock < 20).length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.categoryName}</div>
                                        <div className="text-xs text-gray-500">
                                            {product.subCategoryName}
                                            {product.extraCategoryName && ` → ${product.extraCategoryName}`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-600' :
                                            product.stock < 20 ? 'text-orange-600' : 'text-green-600'
                                            }`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewDetails(product)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No products found
                    </div>
                )}
            </div>

            {/* Product Details Modal */}
            {showDetailsModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                                <p className="text-gray-600 mt-1">SKU: {selectedProduct.sku}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="text-2xl font-bold text-green-600">${selectedProduct.price.toFixed(2)}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Stock</p>
                                    <p className={`text-2xl font-bold ${selectedProduct.stock < 10 ? 'text-red-600' : 'text-gray-800'
                                        }`}>
                                        {selectedProduct.stock} units
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className={`font-semibold ${selectedProduct.status === 'active' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {selectedProduct.status}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Created Date</p>
                                    <p className="font-semibold">{selectedProduct.createdAt}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-2">Category Path</p>
                                <div className="flex items-center text-sm">
                                    <span>{selectedProduct.categoryName}</span>
                                    <ChevronRight size={14} className="mx-2" />
                                    <span>{selectedProduct.subCategoryName}</span>
                                    {selectedProduct.extraCategoryName && (
                                        <>
                                            <ChevronRight size={14} className="mx-2" />
                                            <span>{selectedProduct.extraCategoryName}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Description</p>
                                <p className="text-gray-700">{selectedProduct.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}