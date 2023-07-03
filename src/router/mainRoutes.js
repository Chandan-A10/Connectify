import Dashboard from "../components/Dashboard";
import ChatRoom from "../components/chatRoom/Chatroom";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";


//creating Public Routes which can be accessed by anyone
export const PublicRoutes=[
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/signup',
        element:<SignupPage/>
    },
    {
        path:'/test',
        element:<ChatRoom/>
    }
]