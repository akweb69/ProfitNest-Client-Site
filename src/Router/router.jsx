import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Homepage from "../Layout/Homepage";
import Login from "../Pages/Login";
import Sign_Up from "../Pages/Sign_Up";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: "/home",
                element: <Homepage></Homepage>
            },

        ]
    }
    ,
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/signup",
        element: <Sign_Up></Sign_Up>
    }
])

export default router;