// components/Users/ViewUsers.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye, Download } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    totalOrders: number;
    totalSpent: number;
    status: 'active' | 'inactive';
    joinedDate: string;
}

export default function ViewUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockUsers: User[] = [
                {
                    id: "1",
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "+1234567890",
                    address: "123 Main St",
                    city: "New York",
                    state: "NY",
                    totalOrders: 15,
                    totalSpent: 1250.50,
                    status: "active",
                    joinedDate: "2024-01-15"
                },
                {
                    id: "2",
                    name: "Jane Smith",
                    email: "jane@example.com",
                    phone: "+1234567891",
                    address: "456 Oak Ave",
                    city: "Los Angeles",
                    state: "CA",
                    totalOrders: 8,
                    totalSpent: 450.75,
                    status: "active",
                    joinedDate: "2024-02-20"
                },
                {
                    id: "3",
                    name: "Mike Johnson",
                    email: "mike@example.com",
                    phone: "+1234567892",
                    address: "789 Pine Rd",
                    city: "Chicago",
                    state: "IL",
                    totalOrders: 3,
                    totalSpent: 125.25,
                    status: "inactive",
                    joinedDate: "2024-03-10"
                },
                {
                    id: "4",
                    name: "Sarah Williams",
                    email: "sarah@example.com",
                    phone: "+1234567893",
                    address: "321 Elm St",
                    city: "Houston",
                    state: "TX",
                    totalOrders: 22,
                    totalSpent: 3200.00,
                    status: "active",
                    joinedDate: "2023-12-05"
                }
            ];
            setUsers(mockUsers);
            setLoading(false);
        }, 1000);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);
        const matchesStatus = filterStatus === "all" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            setUsers(users.filter(user => user.id !== id));
            alert("User deleted successfully!");
        }
    };

    const handleViewDetails = (user: User) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const exportToCSV = () => {
        const headers = ["Name", "Email", "Phone", "City", "State", "Total Orders", "Total Spent", "Status", "Joined Date"];
        const csvData = filteredUsers.map(user => [
            user.name,
            user.email,
            user.phone,
            user.city,
            user.state,
            user.totalOrders,
            user.totalSpent,
            user.status,
            user.joinedDate
        ]);

        const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
        a.click();
        URL.revokeObjectURL(url);
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
                <h1 className="text-3xl font-bold text-gray-800">View Users</h1>
                <p className="text-gray-600 mt-2">Manage and monitor all customer accounts</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-blue-600">
                        ${users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Avg Orders/User</p>
                    <p className="text-2xl font-bold text-purple-600">
                        {(users.reduce((sum, u) => sum + u.totalOrders, 0) / users.length).toFixed(1)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-10 w-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.city}, {user.state}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalOrders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                        ${user.totalSpent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewDetails(user)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                )}
            </div>

            {/* User Details Modal */}
            {showDetailsModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">User Details</h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="h-20 w-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                                    <p className="text-gray-600">{selectedUser.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{selectedUser.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className={`font-medium ${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {selectedUser.status}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Joined Date</p>
                                    <p className="font-medium">{selectedUser.joinedDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                    <p className="font-medium">{selectedUser.totalOrders}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Spent</p>
                                    <p className="font-medium text-green-600">${selectedUser.totalSpent.toFixed(2)}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{selectedUser.address}</p>
                                    <p className="font-medium">{selectedUser.city}, {selectedUser.state}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}