// Pages/Dashboard/Dashboard.tsx
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatsCards from "../../components/Dashboard/StatsCards";
import CountdownTimer from "../../components/Dashboard/CountdownTimer";
import AddAdmin from "../../components/Admin/AddAdmin";
import ViewAdmin from "../../components/Admin/ViewAdmin";
import AddUser from "../../components/Users/AddUser";
import ViewUsers from "../../components/Users/ViewUsers";
import AddCategory from "../../components/Category/AddCategory";
import ViewCategory from "../../components/Category/ViewCategory";
import AddSubCategory from "../../components/SubCategory/AddSubCategory";
import ViewSubCategory from "../../components/SubCategory/ViewSubCategory";
import AddExtraCategory from "../../components/ExtraCategory/AddExtraCategory";
import ViewExtraCategory from "../../components/ExtraCategory/ViewExtraCategory";
import AddProduct from "../../components/Products/AddProduct";
import ViewProducts from "../../components/Products/ViewProducts";
import AllOrders from "../../components/Orders/AllOrders";


export default function Dashboard() {
    const [activeView, setActiveView] = useState<string>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardContent />;
            case 'add-admin':
                return <AddAdmin />;
            case 'view-admin':
                return <ViewAdmin />;
            case 'add-user':
                return <AddUser />;
            case 'view-users':
                return <ViewUsers />;
            case 'add-category':
                return <AddCategory />;
            case 'view-category':
                return <ViewCategory />;
            case 'add-subcategory':
                return <AddSubCategory />;
            case 'view-subcategory':
                return <ViewSubCategory />;
            case 'add-extracategory':
                return <AddExtraCategory />;
            case 'view-extracategory':
                return <ViewExtraCategory />;
            case 'add-product':
                return <AddProduct />;
            case 'view-products':
                return <ViewProducts />;
            case 'all-orders':
                return <AllOrders />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
}

// Dashboard Content Component
function DashboardContent() {
    const [stats, setStats] = useState({
        totalAdmins: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalSubCategories: 0,
        totalExtraCategories: 0,
        totalOrders: 0,
        earnings: 0,
        pendingOrders: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                totalAdmins: 12,
                totalUsers: 1248,
                totalProducts: 342,
                totalCategories: 15,
                totalSubCategories: 48,
                totalExtraCategories: 32,
                totalOrders: 856,
                earnings: 45678,
                pendingOrders: 23
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer targetDate="2024-12-31T23:59:59" />

            {/* Stats Cards */}
            <StatsCards stats={stats} loading={loading} />
        </div>
    );
}