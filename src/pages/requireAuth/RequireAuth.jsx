import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

function RequireAuth({allowedRoles}){
    console.log("allowedRoles",allowedRoles);
     
    const {user} = useAuth()
    const location = useLocation();

    console.log("require auth usser ",user )
   
    
    if((!user)){
        console.log("user not logged in")

       return <Navigate to={"/"}  replace/>
        
       
    }

    else if((user&&!allowedRoles.includes(user.authority))){
        console.log("user not authorized")

        return <Navigate to={"/unauthorized"} state={{from : location}} replace/>

     }

     return <Outlet/>;

}
export default RequireAuth;