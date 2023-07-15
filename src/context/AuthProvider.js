import { createContext,useState } from "react";
import jwt from 'jwt-decode'

const AuthContext = createContext({})

export const AuthProvider=({children})=>{
    const [token,setToken] = useState(null);


    let user = null;
    let localStorageToken = localStorage.getItem("token");
    console.log("localstorage token ",localStorageToken)

    if(localStorageToken){
        user = jwt(localStorageToken);
    }

    console.log("user after decode ",user)




    let value ={user,setToken}
    return (
        <AuthContext.Provider value={value}>
            {children}

        </AuthContext.Provider>
    )
}

export default AuthContext;