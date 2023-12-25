
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {

    const location = useLocation();

    const {user,loading} = useAuth();
    console.log(user)

    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;