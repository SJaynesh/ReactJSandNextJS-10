// components/Products/AddProduct.tsx
import { useState, useEffect } from "react";
import { Package, DollarSign, Tag, Layers, Grid, FileText, Shield } from "lucide-react";

interface ProductFormData {
    name: string;
    description: string;
    price: number | string;
    stock: number | string;
    categoryId: string;
    subCategoryId: string;
    extraCategoryId: string;
    images: string[];
    sku: string;
    status: 'active' | 'inactive';
}

interface Category {
    id: string;
    name: string;
}

interface SubCategory {
    id: string;
    name: string;
    categoryId: string;
}

interface ExtraCategory {
    id: string;
    name: string;
    subCategoryId: string;
}

export default function AddProduct() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: "",
        subCategoryId: "",
        extraCategoryId: "",
        images: [],
        sku: "",
        status: "active"
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [extraCategories, setExtraCategories] = useState<ExtraCategory[]>([]);
    const [errors, setErrors] = useState<Partial<ProductFormData>>({});

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (formData.categoryId) {
            fetchSubCategories(formData.categoryId);
        }
    }, [formData.categoryId]);

    useEffect(() => {
        if (formData.subCategoryId) {
            fetchExtraCategories(formData.subCategoryId);
        }
    }, [formData.subCategoryId]);

    const fetchCategories = async () => {
        setTimeout(() => {
            setCategories([
                { id: "1", name: "Electronics" },
                { id: "2", name: "Clothing" },
                { id: "3", name: "Books" }
            ]);
        }, 500);
    };

    const fetchSubCategories = async (categoryId: string) => {
        setTimeout(() => {
            const allSubCategories: SubCategory[] = [
                { id: "1", name: "Smartphones", categoryId: "1" },
                { id: "2", name: "Laptops", categoryId: "1" },
                { id: "3", name: "Men's Clothing", categoryId: "2" },
                { id: "4", name: "Women's Clothing", categoryId: "2" },
                { id: "5", name: "Fiction", categoryId: "3" }
            ];
            setSubCategories(allSubCategories.filter(sub => sub.categoryId === categoryId));
            setFormData(prev => ({ ...prev, subCategoryId: "", extraCategoryId: "" }));
        }, 500);
    };

    const fetchExtraCategories = async (subCategoryId: string) => {
        setTimeout(() => {
            const allExtraCategories: ExtraCategory[] = [
                { id: "1", name: "Premium Smartphones", subCategoryId: "1" },
                { id: "2", name: "Budget Smartphones", subCategoryId: "1" },
                { id: "3", name: "Gaming Laptops", subCategoryId: "2" },
                { id: "4", name: "Casual Wear", subCategoryId: "3" }
            ];
            setExtraCategories(allExtraCategories.filter(extra => extra.subCategoryId === subCategoryId));
        }, 500);
    };

    const validateForm = () => {
        const newErrors: Partial<ProductFormData> = {};

        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (formData.price <= "0") newErrors.price = "Price must be greater than 0";
        if (formData.stock < "0") newErrors.stock = "Stock cannot be negative";
        if (!formData.categoryId) newErrors.categoryId = "Please select a category";
        if (!formData.subCategoryId) newErrors.subCategoryId = "Please select a subcategory";
        if (!formData.sku) newErrors.sku = "SKU is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Product data:", formData);
            alert("Product added successfully!");
            setFormData({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                categoryId: "",
                subCategoryId: "",
                extraCategoryId: "",
                images: [],
                sku: "",
                status: "active"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        if (errors[e.target.name as keyof ProductFormData]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined
            });
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                <p className="text-gray-600 mt-2">Create a new product with category hierarchy</p>
            </div>

            <div className="max-w-4xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Basic Information</h3>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Product Name *
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
                                    placeholder="Enter product name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="col-span-2">
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
                                    placeholder="Enter product description"
                                />
                            </div>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Price * ($)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Stock Quantity *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="0"
                                />
                            </div>
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                SKU *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Shield size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.sku ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter unique SKU"
                                />
                            </div>
                            {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                        </div>

                        <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Category Hierarchy</h3>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Category *
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
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Sub Category *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Layers size={20} className="text-gray-400" />
                                </div>
                                <select
                                    name="subCategoryId"
                                    value={formData.subCategoryId}
                                    onChange={handleChange}
                                    disabled={!formData.categoryId}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.subCategoryId ? 'border-red-500' : 'border-gray-300'}
                    ${!formData.categoryId ? 'bg-gray-100' : ''}`}
                                >
                                    <option value="">Select subcategory</option>
                                    {subCategories.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.subCategoryId && <p className="text-red-500 text-xs mt-1">{errors.subCategoryId}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Extra Category (Optional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package size={20} className="text-gray-400" />
                                </div>
                                <select
                                    name="extraCategoryId"
                                    value={formData.extraCategoryId}
                                    onChange={handleChange}
                                    disabled={!formData.subCategoryId}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${!formData.subCategoryId ? 'bg-gray-100' : ''}`}
                                >
                                    <option value="">Select extra category (optional)</option>
                                    {extraCategories.map(extra => (
                                        <option key={extra.id} value={extra.id}>{extra.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-2">
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
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "",
                                description: "",
                                price: 0,
                                stock: 0,
                                categoryId: "",
                                subCategoryId: "",
                                extraCategoryId: "",
                                images: [],
                                sku: "",
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