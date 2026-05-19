import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../Pages/Auth/LoginPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import OTPVerifyPage from "../Pages/Auth/OTPVerifyPage";
import NewPasswordPage from "../Pages/Auth/NewPasswordPage";

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
                path: '/dashboard',
                Component: Dashboard
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
            }
        ]
    },
]);