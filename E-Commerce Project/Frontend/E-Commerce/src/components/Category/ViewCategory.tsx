// components/Category/ViewCategory.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, Grid } from "lucide-react";

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

export default function ViewCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockCategories: Category[] = [
                {
                    id: "1",
                    name: "Electronics",
                    description: "Electronic devices and accessories",
                    imageUrl: "https://via.placeholder.com/150",
                    productCount: 45,
                    status: "active",
                    createdAt: "2024-01-15"
                },
                {
                    id: "2",
                    name: "Clothing",
                    description: "Fashion and apparel",
                    imageUrl: "https://via.placeholder.com/150",
                    productCount: 78,
                    status: "active",
                    createdAt: "2024-01-20"
                },
                {
                    id: "3",
                    name: "Books",
                    description: "Educational and fiction books",
                    imageUrl: "https://via.placeholder.com/150",
                    productCount: 123,
                    status: "active",
                    createdAt: "2024-02-10"
                },
                {
                    id: "4",
                    name: "Home & Garden",
                    description: "Home decor and garden supplies",
                    imageUrl: "https://via.placeholder.com/150",
                    productCount: 34,
                    status: "inactive",
                    createdAt: "2024-03-05"
                }
            ];
            setCategories(mockCategories);
            setLoading(false);
        }, 1000);
    };

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || category.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this category? All products in this category will be affected.")) {
            setCategories(categories.filter(cat => cat.id !== id));
            alert("Category deleted successfully!");
        }
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
                <h1 className="text-3xl font-bold text-gray-800">View Categories</h1>
                <p className="text-gray-600 mt-2">Manage and organize product categories</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Active Categories</p>
                    <p className="text-2xl font-bold text-green-600">{categories.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {categories.reduce((sum, c) => sum + c.productCount, 0)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or description..."
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
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-40 bg-linear-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                            {category.imageUrl ? (
                                <img src={category.imageUrl} alt={category.name} className="h-full w-full object-cover" />
                            ) : (
                                <Grid size={48} className="text-white" />
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {category.status}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-500">Products: {category.productCount}</span>
                                <span className="text-sm text-gray-500">Created: {category.createdAt}</span>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-2">
                                    <Eye size={18} />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-2">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900 p-2">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
                    No categories found
                </div>
            )}
        </div>
    );
}