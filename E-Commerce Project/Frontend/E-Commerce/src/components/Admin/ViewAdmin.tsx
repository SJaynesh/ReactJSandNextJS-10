// components/Admin/ViewAdmin.tsx
import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Eye } from "lucide-react";
import { fetchAllAdmin } from "../../services/admin/AdminService";
import { toast } from "react-toastify";

interface Admin {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_image: string,
    isActive: true | false;
    create_at: string;
}

export default function ViewAdmin() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        // Simulate API call
        setTimeout(async () => {

            const data = await fetchAllAdmin();

            if (data.status === 200) {
                console.log(data.result);

                setAdmins(data.result);
            } else {
                toast.error(data.message);
            }

            setLoading(false);
        }, 1000);
    };

    // const filteredAdmins = admins.filter(admin => {
    //     const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    //     return matchesSearch;
    // });

    const handleDelete = () => {

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
                <h1 className="text-3xl font-bold text-gray-800">View Admins</h1>
                <p className="text-gray-600 mt-2">Manage and monitor all administrator accounts</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                </div>
            </div>

            {/* Admins Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.map((admin) => (
                                <tr key={admin._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><img src={admin.profile_image} width={50} alt="" /></td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{admin.first_name + " " + admin.last_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{admin.email}</div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {admin.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.create_at}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => { }} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {admins.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No admins found
                    </div>
                )}
            </div>
        </div>
    );
}