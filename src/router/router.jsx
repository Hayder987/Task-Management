import { createBrowserRouter } from "react-router";
import Home from "../page/Home";
import MainLayout from "../main/MainLayout";
import TaskPage from "../page/TaskPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {path:'/', element:<Home></Home>},
            {path:'/task', element:<TaskPage></TaskPage>}
        ]
    }
])