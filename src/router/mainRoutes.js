import SignUp from "../components/Signup";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";


//creating Public Routes which can be accessed by anyone
export const PublicRoutes=[
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/register',
        element:<SignupPage/>
    },
    {
        path:'/test',
        element:<SignUp/>
    },
]