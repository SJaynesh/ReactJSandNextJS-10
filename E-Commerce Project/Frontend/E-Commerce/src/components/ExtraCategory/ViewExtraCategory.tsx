// components/ExtraCategory/ViewExtraCategory.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, Package, ChevronRight } from "lucide-react";

interface ExtraCategory {
    id: string;
    name: string;
    description: string;
    subCategoryId: string;
    subCategoryName: string;
    categoryName: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

export default function ViewExtraCategory() {
    const [extraCategories, setExtraCategories] = useState<ExtraCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("all");

    useEffect(() => {
        fetchExtraCategories();
    }, []);

    const fetchExtraCategories = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockExtraCategories: ExtraCategory[] = [
                {
                    id: "1",
                    name: "Premium Smartphones",
                    description: "High-end flagship smartphones",
                    subCategoryId: "1",
                    subCategoryName: "Smartphones",
                    categoryName: "Electronics",
                    productCount: 12,
                    status: "active",
                    createdAt: "2024-01-15"
                },
                {
                    id: "2",
                    name: "Budget Smartphones",
                    description: "Affordable smartphones",
                    subCategoryId: "1",
                    subCategoryName: "Smartphones",
                    categoryName: "Electronics",
                    productCount: 8,
                    status: "active",
                    createdAt: "2024-01-20"
                },
                {
                    id: "3",
                    name: "Gaming Laptops",
                    description: "High-performance gaming laptops",
                    subCategoryId: "2",
                    subCategoryName: "Laptops",
                    categoryName: "Electronics",
                    productCount: 6,
                    status: "active",
                    createdAt: "2024-02-10"
                },
                {
                    id: "4",
                    name: "Casual Wear",
                    description: "Everyday casual clothing",
                    subCategoryId: "3",
                    subCategoryName: "Men's Clothing",
                    categoryName: "Clothing",
                    productCount: 25,
                    status: "inactive",
                    createdAt: "2024-03-05"
                }
            ];
            setExtraCategories(mockExtraCategories);
            setLoading(false);
        }, 1000);
    };

    const filteredExtraCategories = extraCategories.filter(extra => {
        const matchesSearch = extra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            extra.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubCategory = selectedSubCategory === "all" || extra.subCategoryId === selectedSubCategory;
        return matchesSearch && matchesSubCategory;
    });

    const subCategories = [...new Set(extraCategories.map(extra => ({
        id: extra.subCategoryId,
        name: extra.subCategoryName,
        category: extra.categoryName
    })))];

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this extra category?")) {
            setExtraCategories(extraCategories.filter(extra => extra.id !== id));
            alert("ExtraCategory deleted successfully!");
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
                <h1 className="text-3xl font-bold text-gray-800">View Extra Categories</h1>
                <p className="text-gray-600 mt-2">Manage extra categories under subcategories</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Extra Categories</p>
                    <p className="text-2xl font-bold text-gray-800">{extraCategories.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Active Categories</p>
                    <p className="text-2xl font-bold text-green-600">{extraCategories.filter(e => e.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {extraCategories.reduce((sum, e) => sum + e.productCount, 0)}
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
                            placeholder="Search extra categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All SubCategories</option>
                        {subCategories.map(sub => (
                            <option key={sub.id} value={sub.id}>
                                {sub.category} → {sub.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Extra Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExtraCategories.map((extra) => (
                    <div key={extra.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                            <Package size={32} className="text-white" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{extra.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${extra.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {extra.status}
                                </span>
                            </div>

                            <div className="text-sm text-gray-500 mb-2 flex items-center">
                                <span>{extra.categoryName}</span>
                                <ChevronRight size={14} className="mx-1" />
                                <span>{extra.subCategoryName}</span>
                                <ChevronRight size={14} className="mx-1" />
                                <span>{extra.name}</span>
                            </div>

                            <p className="text-gray-600 text-sm mb-4">{extra.description}</p>

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-500">Products: {extra.productCount}</span>
                                <span className="text-sm text-gray-500">Created: {extra.createdAt}</span>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-2">
                                    <Eye size={18} />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-2">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(extra.id)} className="text-red-600 hover:text-red-900 p-2">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredExtraCategories.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
                    No extra categories found
                </div>
            )}
        </div>
    );
}