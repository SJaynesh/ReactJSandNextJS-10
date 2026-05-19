// components/Users/AddUser.tsx
import { useState } from "react";
import { UserPlus, Mail, Lock, Phone } from "lucide-react";

interface UserFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export default function AddUser() {
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India"
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<UserFormData> = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // API call here
            console.log("User data:", formData);
            alert("User added successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
                country: "India"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name as keyof UserFormData]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined
            });
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add New User</h1>
                <p className="text-gray-600 mt-2">Create a new customer account</p>
            </div>

            <div className="max-w-4xl bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Personal Information</h3>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserPlus size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter full name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
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

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Address Information</h3>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Address *
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={2}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                  ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter street address"
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter city"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter state"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter ZIP code"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Country
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Security</h3>
                        </div>

                        <div>
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

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500
                    ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Confirm password"
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Add User
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                phone: "",
                                address: "",
                                city: "",
                                state: "",
                                zipCode: "",
                                country: "India"
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