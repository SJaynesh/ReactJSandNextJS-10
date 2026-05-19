// components/Category/AddCategory.tsx
import { useState } from "react";
import { FileText, Image, Tag } from "lucide-react";

interface CategoryFormData {
    name: string;
    description: string;
    imageUrl: string;
    status: 'active' | 'inactive';
}

export default function AddCategory() {
    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        description: "",
        imageUrl: "",
        status: "active"
    });

    const [errors, setErrors] = useState<Partial<CategoryFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<CategoryFormData> = {};

        if (!formData.name) newErrors.name = "Category name is required";
        if (!formData.description) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // API call here
            console.log("Category data:", formData);
            alert("Category added successfully!");
            setFormData({
                name: "",
                description: "",
                imageUrl: "",
                status: "active"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name as keyof CategoryFormData]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined
            });
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New Category</h1>
                <p className="text-gray-600 mt-2">Create a new product category</p>
            </div>

            <div className="max-w-2xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category Name *
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
                                placeholder="Enter category name"
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
                                placeholder="Enter category description"
                            />
                        </div>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Image size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter image URL"
                            />
                        </div>
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
                            Add Category
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "",
                                description: "",
                                imageUrl: "",
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