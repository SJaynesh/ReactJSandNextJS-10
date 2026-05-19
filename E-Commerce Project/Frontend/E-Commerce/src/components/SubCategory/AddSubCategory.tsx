// components/SubCategory/AddSubCategory.tsx
import { useState, useEffect } from "react";
import { FileText, Tag, Grid } from "lucide-react";

interface SubCategoryFormData {
    name: string;
    description: string;
    categoryId: string;
    status: 'active' | 'inactive';
}

interface Category {
    id: string;
    name: string;
}

export default function AddSubCategory() {
    const [formData, setFormData] = useState<SubCategoryFormData>({
        name: "",
        description: "",
        categoryId: "",
        status: "active"
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [errors, setErrors] = useState<Partial<SubCategoryFormData>>({});

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockCategories: Category[] = [
                { id: "1", name: "Electronics" },
                { id: "2", name: "Clothing" },
                { id: "3", name: "Books" },
                { id: "4", name: "Home & Garden" }
            ];
            setCategories(mockCategories);
        }, 500);
    };

    const validateForm = () => {
        const newErrors: Partial<SubCategoryFormData> = {};

        if (!formData.name) newErrors.name = "Subcategory name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.categoryId) newErrors.categoryId = "Please select a category";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // API call here
            console.log("SubCategory data:", formData);
            alert("SubCategory added successfully!");
            setFormData({
                name: "",
                description: "",
                categoryId: "",
                status: "active"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name as keyof SubCategoryFormData]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined
            });
        }
    };

    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New SubCategory</h1>
                <p className="text-gray-600 mt-2">Create a new subcategory under a parent category</p>
            </div>

            <div className="max-w-2xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Parent Category *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Grid size={20} className="text-gray-400" />
                            </div>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.categoryId ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
                        {selectedCategory && (
                            <p className="text-xs text-gray-500 mt-1">Adding subcategory under: {selectedCategory.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            SubCategory Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter subcategory name"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description *
                        </label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                                <FileText size={20} className="text-gray-400" />
                            </div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter subcategory description"
                            />
                        </div>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Add SubCategory
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "",
                                description: "",
                                categoryId: "",
                                status: "active"
                            })}
                            className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}