// components/Orders/AllOrders.tsx
import { useState, useEffect } from "react";
import { Search, Eye, CreditCard, Truck, CheckCircle, Clock } from "lucide-react";

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    products: { name: string; quantity: number; price: number }[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
    paymentMethod: string;
    createdAt: string;
}

export default function AllOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        // Simulate API call
        setTimeout(() => {
            const mockOrders: Order[] = [
                {
                    id: "ORD-001",
                    customerName: "John Doe",
                    customerEmail: "john@example.com",
                    products: [
                        { name: "Product A", quantity: 2, price: 29.99 },
                        { name: "Product B", quantity: 1, price: 49.99 }
                    ],
                    total: 109.97,
                    status: "pending",
                    paymentMethod: "Credit Card",
                    createdAt: "2024-01-15"
                },
                {
                    id: "ORD-002",
                    customerName: "Jane Smith",
                    customerEmail: "jane@example.com",
                    products: [
                        { name: "Product C", quantity: 1, price: 99.99 }
                    ],
                    total: 99.99,
                    status: "paid",
                    paymentMethod: "PayPal",
                    createdAt: "2024-01-16"
                },
                {
                    id: "ORD-003",
                    customerName: "Mike Johnson",
                    customerEmail: "mike@example.com",
                    products: [
                        { name: "Product D", quantity: 3, price: 19.99 }
                    ],
                    total: 59.97,
                    status: "shipped",
                    paymentMethod: "Bank Transfer",
                    createdAt: "2024-01-17"
                },
                {
                    id: "ORD-004",
                    customerName: "Sarah Williams",
                    customerEmail: "sarah@example.com",
                    products: [
                        { name: "Product E", quantity: 1, price: 149.99 }
                    ],
                    total: 149.99,
                    status: "delivered",
                    paymentMethod: "Credit Card",
                    createdAt: "2024-01-18"
                }
            ];
            setOrders(mockOrders);
            setLoading(false);
        }, 1000);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const config = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={14} /> },
            paid: { color: "bg-blue-100 text-blue-800", icon: <CreditCard size={14} /> },
            shipped: { color: "bg-purple-100 text-purple-800", icon: <Truck size={14} /> },
            delivered: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} /> }
        };
        const { color, icon } = config[status as keyof typeof config];
        return (
            <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${color}`}>
                {icon}
                {status}
            </span>
        );
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
                <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
                <p className="text-gray-600 mt-2">Manage and track customer orders</p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {orders.filter(o => o.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                        ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-gray-500 text-sm">Delivered Orders</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {orders.filter(o => o.status === 'delivered').length}
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
                            placeholder="Search by order ID or customer name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                                <p className="text-sm text-gray-500">{order.createdAt}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                {getStatusBadge(order.status)}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Customer</p>
                                    <p className="font-medium">{order.customerName}</p>
                                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium">{order.paymentMethod}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Products</p>
                                <div className="space-y-1">
                                    {order.products.map((product, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>{product.name} x {product.quantity}</span>
                                            <span>${(product.price * product.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-xl font-bold text-gray-800">${order.total.toFixed(2)}</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    <Eye size={16} />
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
}