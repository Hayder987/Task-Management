import { createBrowserRouter } from "react-router";
import Home from "../page/Home";
import MainLayout from "../main/MainLayout";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {path:'/', element:<Home></Home>}
        ]
    }
])