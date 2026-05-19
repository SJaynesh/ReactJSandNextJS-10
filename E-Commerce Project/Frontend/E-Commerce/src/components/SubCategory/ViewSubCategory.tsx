// components/SubCategory/ViewSubCategory.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, Layers, ChevronRight } from "lucide-react";

interface SubCategory {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

export default function ViewSubCategory() {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockSubCategories: SubCategory[] = [
                {
                    id: "1",
                    name: "Smartphones",
                    description: "Latest smartphones and accessories",
                    categoryId: "1",
                    categoryName: "Electronics",
                    productCount: 25,
                    status: "active",
                    createdAt: "2024-01-15"
                },
                {
                    id: "2",
                    name: "Laptops",
                    description: "Notebooks and computers",
                    categoryId: "1",
                    categoryName: "Electronics",
                    productCount: 18,
                    status: "active",
                    createdAt: "2024-01-20"
                },
                {
                    id: "3",
                    name: "Men's Clothing",
                    description: "Men's fashion and apparel",
                    categoryId: "2",
                    categoryName: "Clothing",
                    productCount: 42,
                    status: "active",
                    createdAt: "2024-02-10"
                },
                {
                    id: "4",
                    name: "Women's Clothing",
                    description: "Women's fashion and apparel",
                    categoryId: "2",
                    categoryName: "Clothing",
                    productCount: 38,
                    status: "inactive",
                    createdAt: "2024-03-05"
                },
                {
                    id: "5",
                    name: "Fiction",
                    description: "Fictional books and novels",
                    categoryId: "3",
                    categoryName: "Books",
                    productCount: 56,
                    status: "active",
                    createdAt: "2024-03-10"
                }
            ];
            setSubCategories(mockSubCategories);
            setLoading(false);
        }, 1000);
    };

    const filteredSubCategories = subCategories.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || sub.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(subCategories.map(sub => ({ id: sub.categoryId, name: sub.categoryName })))];

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            setSubCategories(subCategories.filter(sub => sub.id !== id));
            alert("SubCategory deleted successfully!");
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
                <h1 className="text-3xl font-bold text-gray-800">View SubCategories</h1>
                <p className="text-gray-600 mt-2">Manage subcategories under main categories</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total SubCategories</p>
                    <p className="text-2xl font-bold text-gray-800">{subCategories.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Active SubCategories</p>
                    <p className="text-2xl font-bold text-green-600">{subCategories.filter(s => s.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {subCategories.reduce((sum, s) => sum + s.productCount, 0)}
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
                            placeholder="Search subcategories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* SubCategories List */}
            <div className="space-y-4">
                {filteredSubCategories.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Layers size={24} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <span>{sub.categoryName}</span>
                                        <ChevronRight size={14} className="mx-1" />
                                        <span>{sub.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center space-x-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {sub.status}
                                </span>
                                <button className="text-blue-600 hover:text-blue-900">
                                    <Eye size={18} />
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-900">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{sub.description}</p>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500">
                                Created: {sub.createdAt}
                            </div>
                            <div className="text-sm font-medium text-blue-600">
                                {sub.productCount} Products
                            </div>
                        </div>
                    </div>
                ))}

                {filteredSubCategories.length === 0 && (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
                        No subcategories found
                    </div>
                )}
            </div>
        </div>
    );
}