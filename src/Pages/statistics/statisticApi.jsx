import axios from "axios";
import {CONFIG} from "../../httpClient/config";
export const getStatisticByExamId = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/users/statistic/byPoint/${examId || 1}`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        });
}

export const getStatisticByQuesId = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/users/statistic/byQues/${examId || 1}`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        });
}

export const getExams = () => {
    console.log("url is: ",CONFIG.baseUrl)
    return axios
        .get(`${CONFIG.baseUrl}/api/exams/all`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        })
}