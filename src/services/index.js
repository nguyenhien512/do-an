
import httpClient from "../httpClient/httpClient"
import { END_POINT } from "../httpClient/config"
export const authenticate=(data)=>{

    return httpClient.login(`${END_POINT.login}`,data)
}

export const registerUser=(data)=>{
    return httpClient.registerUser(`${END_POINT.register}`,data)
}

export const getAllQuestion=()=>{
    return httpClient.getAllQuestion(`${END_POINT.getAllQuestion}`)
}

export const createQuestion=(data)=>{
    return httpClient.createQuestion(`${END_POINT.createQuestion}`,data)
}

export const updateQuestion=(data)=>{
    return httpClient.updateQuestion(`${END_POINT.updateQuestion}`,data)
}

export const deleteQuestion=(id)=>{
    return httpClient.deleteQuestion(`${END_POINT.deleteQuestion}`,id)
}

export const getQuestionById=(id)=>{
    return httpClient.getQuestionById(`${END_POINT.getAllQuestion}`,id)
}
