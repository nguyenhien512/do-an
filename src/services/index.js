
import httpClient from "../httpClient/httpClient"
import { END_POINT } from "../httpClient/config"
export const authenticate=(data)=>{
    console.log("service authen data : ",data)

    return httpClient.login(`${END_POINT.login}`,data)
}

export const registerUser=(data)=>{
    console.log("service register data : ",data)
    return httpClient.login(`${END_POINT.login}`,data)


}

