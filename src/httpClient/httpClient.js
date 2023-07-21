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

const getAllQuestion=(endPoint)=>{
    let token = localStorage.getItem('token');
    return instance.get(endPoint,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
}
const createQuestion=(endPoint,data)=>{
    let token = localStorage.getItem('token');
    return instance.post(endPoint,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`            }
        }
        )
}


const  httpClient = {
    postUser,
    login,
    registerUser,
    getAllQuestion,
    createQuestion
    
}


export default httpClient;
