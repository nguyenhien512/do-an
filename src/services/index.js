
import httpClient from "../httpClient/httpClient"
import { END_POINT } from "../httpClient/config"
export const authenticate=(data)=>{
    console.log("service authen data : ",data)

    return httpClient.login(`${END_POINT.login}`,data)
}

export const registerUser=(data)=>{
    console.log("service register data : ",data)
    return httpClient.registerUser(`${END_POINT.register}`,data)
}

export const getAllQuestion=()=>{
    console.log("get all question service");
    return httpClient.getAllQuestion(`${END_POINT.getAllQuestion}`)
}

export const createQuestion=(data)=>{
    console.log("service register data : ",data)
    return httpClient.createQuestion(`${END_POINT.createQuestion}`,data)
}

export const updateQuestion=(data)=>{
    console.log("service update data : ",data)
    return httpClient.updateQuestion(`${END_POINT.updateQuestion}`,data)
}

export const deleteQuestion=(id)=>{
    console.log("service delete data : ",id)
    return httpClient.deleteQuestion(`${END_POINT.deleteQuestion}`,id)
}

