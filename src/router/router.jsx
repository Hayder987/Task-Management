import { createBrowserRouter } from "react-router";
import Home from "../page/Home";
import MainLayout from "../main/MainLayout";
import TaskPage from "../page/TaskPage";
import Register from "../page/Register";
import Login from "../page/Login";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {path:'/', element:<Home></Home>},
            {path:'/task', element:<TaskPage></TaskPage>},
            {path:'/register', element:<Register></Register>},
            {path:'/login', element:<Login></Login>}
        ]
    }
])