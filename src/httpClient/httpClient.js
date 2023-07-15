import instance from "./axiosInstance";
//example 
const postUser = (endPoint,data)=>{
   return instance.post(endPoint,data,{
    //    header : {...JWT} 
   })}


const login = (endPoint,data)=>{
    return instance.post(endPoint,data)
}

const registerUser =(endPoint,data)=>{
    return instance.post(endPoint,data)

}

const  httpClient = {
    postUser,
    login,
    registerUser
    
}


export default httpClient;
