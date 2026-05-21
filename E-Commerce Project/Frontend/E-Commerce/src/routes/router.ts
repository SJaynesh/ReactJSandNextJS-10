import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../Pages/Auth/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import OTPVerifyPage from "../Pages/Auth/OTPVerifyPage";
import NewPasswordPage from "../Pages/Auth/NewPasswordPage";
import { DashboardContent } from "../Pages/Dashboard/DashboardContent";
import AddAdminPage from "../Pages/Admin/AddAdminPage";
import ViewAdminPage from "../Pages/Admin/ViewAdminPage";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/login',
                Component: LoginPage
            },
            {
                path: '/forgot-password',
                Component: ForgotPasswordPage
            },
            {
                path: '/otp-verify',
                Component: OTPVerifyPage
            },
            {
                path: '/new-password',
                Component: NewPasswordPage
            },
            {
                path: '/dashboard',
                Component: Dashboard,
                children: [
                    {
                        index: true,
                        Component: DashboardContent
                    },
                    {
                        path: 'add-admin',
                        Component: AddAdminPage
                    },
                    {
                        path: 'view-admin',
                        Component: ViewAdminPage
                    }
                ]
            },
        ]
    },
]);