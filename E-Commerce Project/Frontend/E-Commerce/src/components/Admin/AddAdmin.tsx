// components/Admin/AddAdmin.tsx
import { useState } from "react";
import { UserPlus, Mail, Lock } from "lucide-react";

interface FormDataType {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    profile_image: File | null
}


export default function AddAdmin() {
    const [formData, setFormData] = useState<FormDataType>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        profile_image: null
    });

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        profile_image: null
    });

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.first_name) newErrors.first_name = "First Name is required";
        if (!formData.last_name) newErrors.last_name = "Last Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (formData.profile_image === null) newErrors.profile_image = "Profile Image is required";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // API call here
            console.log("Admin data:", formData);

            

            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                phone: "",
                profile_image: null
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field

        setErrors({
            ...errors,
            [e.target.name]: undefined
        });

    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New Admin</h1>
                <p className="text-gray-600 mt-2">Create a new administrator account</p>
            </div>

            <div className="max-w-2xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            First Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserPlus size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter first name"
                            />
                        </div>
                        {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Last Name *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserPlus size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter last name"
                            />
                        </div>
                        {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter email address"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter password"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter phone number"
                        />

                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Profile Image *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserPlus size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="file"
                                name="first_name"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files;
                                    if (file) {
                                        setFormData({
                                            ...formData,
                                            profile_image: file[0]
                                        });
                                    }
                                }}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.profile_image ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter first name"
                            />
                        </div>
                        {errors.profile_image && <p className="text-red-500 text-xs mt-1">{errors.profile_image}</p>}
                    </div>





                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Add Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                                phone: "",
                                profile_image: null
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