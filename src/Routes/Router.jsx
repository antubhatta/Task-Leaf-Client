import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";


import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Layout/Dashboard";

import ContactUsPage from "../Pages/Contactus/ContactUsPage ";
import Error from "../components/Error/Error";
import UserHome from "../Pages/Dashboard/UserPage/UserHome";
import CreateTask from "../Pages/Dashboard/CreateTask";
import TaskManagementDashboard from "../Pages/Dashboard/TaskManagementDashboard";
import UpdateTask from "../Pages/Dashboard/UpdateTask";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
                 
            {
                path:'login',
                element:<Login></Login>
            },
            {
                path:'register',
                element:<Register></Register>
            },
            {
                path:'contactus',
                element:<ContactUsPage></ContactUsPage>
            },
            
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
           

           
            
          
            // admin routes

            
            {
                path:'userhome',
                element:<UserHome></UserHome>,
            },
            {
                path:'createtask',
                element:<CreateTask></CreateTask>,
            },
            {
                path:'tasklist',
                element:<TaskManagementDashboard></TaskManagementDashboard>,
            },
           
            {
                path:'updatetask/:id',
                element:<UpdateTask></UpdateTask>,
                loader:({params}) => fetch(`http://localhost:5000/tasklist/${params.id}`)
            },
           
           



        ]
    },

]);