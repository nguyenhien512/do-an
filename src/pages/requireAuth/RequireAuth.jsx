import { Outlet } from "react-router-dom";

function RequireAuth({allowedRoles}){
       return <>
            <>Hello from require auth</>
            <Outlet />
        </>

}
export default RequireAuth;