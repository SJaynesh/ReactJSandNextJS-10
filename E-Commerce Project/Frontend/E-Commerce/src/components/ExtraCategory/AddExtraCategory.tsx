// components/ExtraCategory/AddExtraCategory.tsx
import { useState, useEffect } from "react";
import { FileText, Tag, Layers } from "lucide-react";

interface ExtraCategoryFormData {
    name: string;
    description: string;
    subCategoryId: string;
    status: 'active' | 'inactive';
}

interface SubCategory {
    id: string;
    name: string;
    categoryName: string;
}

export default function AddExtraCategory() {
    const [formData, setFormData] = useState<ExtraCategoryFormData>({
        name: "",
        description: "",
        subCategoryId: "",
        status: "active"
    });

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [errors, setErrors] = useState<Partial<ExtraCategoryFormData>>({});

    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockSubCategories: SubCategory[] = [
                { id: "1", name: "Smartphones", categoryName: "Electronics" },
                { id: "2", name: "Laptops", categoryName: "Electronics" },
                { id: "3", name: "Men's Clothing", categoryName: "Clothing" },
                { id: "4", name: "Women's Clothing", categoryName: "Clothing" },
                { id: "5", name: "Fiction", categoryName: "Books" }
            ];
            setSubCategories(mockSubCategories);
        }, 500);
    };

    const validateForm = () => {
        const newErrors: Partial<ExtraCategoryFormData> = {};

        if (!formData.name) newErrors.name = "Extra category name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.subCategoryId) newErrors.subCategoryId = "Please select a subcategory";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // API call here
            console.log("ExtraCategory data:", formData);
            alert("ExtraCategory added successfully!");
            setFormData({
                name: "",
                description: "",
                subCategoryId: "",
                status: "active"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name as keyof ExtraCategoryFormData]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined
            });
        }
    };

    const selectedSubCategory = subCategories.find(s => s.id === formData.subCategoryId);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New Extra Category</h1>
                <p className="text-gray-600 mt-2">Create a new extra category under a subcategory</p>
            </div>

            <div className="max-w-2xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Parent SubCategory *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Layers size={20} className="text-gray-400" />
                            </div>
                            <select
                                name="subCategoryId"
                                value={formData.subCategoryId}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.subCategoryId ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select a subcategory</option>
                                {subCategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.categoryName} → {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.subCategoryId && <p className="text-red-500 text-xs mt-1">{errors.subCategoryId}</p>}
                        {selectedSubCategory && (
                            <p className="text-xs text-gray-500 mt-1">
                                Adding extra category under: {selectedSubCategory.categoryName} → {selectedSubCategory.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Extra Category Name *
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
                                placeholder="Enter extra category name"
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
                                placeholder="Enter extra category description"
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
                            Add Extra Category
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "",
                                description: "",
                                subCategoryId: "",
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