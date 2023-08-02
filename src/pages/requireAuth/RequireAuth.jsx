import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

function RequireAuth({allowedRoles}){
     
    const {user} = useAuth()
    const location = useLocation();

   
    
    if((!user)){

       return <Navigate to={"/"}  replace/>
        
       
    }
    else if((user&&!allowedRoles.includes(user.authority))){

        return <Navigate to={"/unauthorized"} state={{from : location}} replace/>

     }

     return <Outlet/>;

}
export default RequireAuth;