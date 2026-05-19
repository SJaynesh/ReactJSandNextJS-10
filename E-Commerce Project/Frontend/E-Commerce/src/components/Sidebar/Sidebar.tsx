// components/Sidebar/Sidebar.tsx
import {
    LayoutDashboard,
    Users,
    UserPlus,
    ShoppingBag,
    Package,
    Grid,
    Layers,
    PlusCircle,
    Eye,
    ShoppingCart,
    LogOut,
    Menu,
    X,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
    activeView: string;
    setActiveView: (view: any) => void;
}

interface MenuItem {
    title: string;
    icon: React.ReactNode;
    view?: string;
    submenu?: {
        title: string;
        view: string;
        icon: React.ReactNode;
    }[];
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>(['admin', 'users', 'category', 'subcategory', 'extracategory', 'products']);

    const menuItems: MenuItem[] = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            view: "dashboard"
        },
        {
            title: "Admin",
            icon: <Users size={20} />,
            submenu: [
                { title: "Add Admin", view: "add-admin", icon: <UserPlus size={18} /> },
                { title: "View Admin", view: "view-admin", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Users",
            icon: <Users size={20} />,
            submenu: [
                { title: "Add User", view: "add-user", icon: <UserPlus size={18} /> },
                { title: "View Users", view: "view-users", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Category",
            icon: <Grid size={20} />,
            submenu: [
                { title: "Add Category", view: "add-category", icon: <PlusCircle size={18} /> },
                { title: "View Category", view: "view-category", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Sub Category",
            icon: <Layers size={20} />,
            submenu: [
                { title: "Add SubCategory", view: "add-subcategory", icon: <PlusCircle size={18} /> },
                { title: "View SubCategory", view: "view-subcategory", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Extra Category",
            icon: <Package size={20} />,
            submenu: [
                { title: "Add ExtraCategory", view: "add-extracategory", icon: <PlusCircle size={18} /> },
                { title: "View ExtraCategory", view: "view-extracategory", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Products",
            icon: <ShoppingBag size={20} />,
            submenu: [
                { title: "Add Products", view: "add-product", icon: <PlusCircle size={18} /> },
                { title: "View Products", view: "view-products", icon: <Eye size={18} /> }
            ]
        },
        {
            title: "Orders",
            icon: <ShoppingCart size={20} />,
            view: "all-orders"
        }
    ];

    const toggleMenu = (title: string) => {
        setOpenMenus(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('authAdminToken');
        window.location.href = '/login';
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-linear-to-b from-gray-900 to-gray-800 text-white flex flex-col
      `}>
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
                    <p className="text-xs text-center text-gray-400 mt-1">Management System</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item, index) => (
                        <div key={index} className="px-2 mb-2">
                            {item.submenu ? (
                                <div>
                                    <button
                                        onClick={() => toggleMenu(item.title.toLowerCase().replace(' ', ''))}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition duration-200"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </div>
                                        {openMenus.includes(item.title.toLowerCase().replace(' ', '')) ?
                                            <ChevronDown size={16} /> : <ChevronRight size={16} />
                                        }
                                    </button>

                                    {openMenus.includes(item.title.toLowerCase().replace(' ', '')) && (
                                        <div className="ml-6 mt-1 space-y-1">
                                            {item.submenu.map((sub, subIndex) => (
                                                <button
                                                    key={subIndex}
                                                    onClick={() => {
                                                        setActiveView(sub.view);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition duration-200
                            ${activeView === sub.view
                                                            ? 'bg-blue-600 text-white'
                                                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                                        }`}
                                                >
                                                    {sub.icon}
                                                    <span>{sub.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setActiveView(item.view);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition duration-200
                    ${activeView === item.view
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </button>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition duration-200 w-full"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}