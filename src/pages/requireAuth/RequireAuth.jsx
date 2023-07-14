import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

function RequireAuth({allowedRoles}){
     
    const {user} = useAuth()
    const location = useLocation();
   
    
    // if((!user)){
    //     console.log("user not logged in")

    //    return <Navigate to={"/"}  replace/>
        
       
    // }
    // else if((user&&!allowedRoles.includes(user.role[0].authority))){
    //     console.log("user not authorized")

    //     return <Navigate to={"/unauthorized"} state={{from : location}} replace/>

    //  }

     return <Outlet/>;

}
export default RequireAuth;