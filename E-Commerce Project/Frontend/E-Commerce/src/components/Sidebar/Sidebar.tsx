// components/Sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Layers,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

export default function Sidebar() {

    const [isAdminOpen, setIsAdminOpen] = useState(false);

    const navigate = useNavigate();
    const currentPath = "/dashboard";

    const handleLogout = () => {
        localStorage.removeItem("authAdminToken");
        window.location.href = "/login";
    };


    const getLinkClass = (isActive: boolean) => {
        return `w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white shadow-xs"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`;
    };

    return (
        <aside className="fixed lg:static inset-y-0 left-0 z-40 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-slate-950 border-r border-slate-800 text-slate-200 flex flex-col h-screen">

            {/* Branding / Header */}
            <div className="p-5 border-b border-slate-800 flex flex-col items-start justify-center gap-1">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm tracking-wider">
                        W
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">WhiteCart</h1>
                </div>
                <p className="text-xs font-medium text-slate-500">E-Commerce Management System</p>
            </div>

            {/* Navigation Body */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">

                {/* Dashboard Main Link */}

                <NavLink to={'/dashboard'} className={({ isActive }) => `w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                    <LayoutDashboard size={18} className={currentPath === "/dashboard" ? "text-white" : "text-slate-400"} />
                    <span>Dashboard</span>
                </NavLink>

                {/* Section Title */}
                <div className="pt-4 px-3.5 mb-2 text-xxs font-semibold text-slate-500 uppercase tracking-wider">
                    Management
                </div>

                {/* Admin Multi-level Menu */}
                <div className="space-y-1">
                    <button
                        onClick={() => setIsAdminOpen(!isAdminOpen)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isAdminOpen
                            ? "text-slate-200 bg-slate-900"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <Users size={18} className={isAdminOpen ? "text-blue-500" : "text-slate-400"} />
                            <span>Admin</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-200 text-slate-500 ${isAdminOpen ? "rotate-180 text-slate-300" : ""}`}
                        />
                    </button>

                    {/* Animated Dropdown Container */}
                    <div className={`pl-7 pr-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isAdminOpen ? "max-h-32 opacity-100 mt-1" : "max-h-0 opacity-0 pointer-events-none"
                        }`}>
                        <NavLink to={'/dashboard/add-admin'}
                            className={({ isActive }) => `w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                        >
                            <UserPlus size={14} />
                            <span>Add New Admin</span>
                        </NavLink>

                        <NavLink to={'/dashboard/view-admin'}
                            className={({ isActive }) => `w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 ${isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                        >
                            <Layers size={14} />
                            <span>View Admin</span>
                        </NavLink>


                    </div>
                </div>

            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950/40 hover:text-red-400 border border-transparent hover:border-red-900/50 transition-all duration-200 w-full group"
                >
                    <LogOut size={18} className="text-slate-500 group-hover:text-red-400 transition-colors" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}