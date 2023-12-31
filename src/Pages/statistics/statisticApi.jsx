import axios from "axios";
import {CONFIG} from "../../httpClient/config";
export const getExams = () => {
    console.log("url is: ",CONFIG.baseUrl)
    return axios
        .get(`${CONFIG.baseUrl}/api/exams/forTeacher`,
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

export const getStatisticByExamId = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/users/statistic/byPoint/${examId}`,
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
        .get(`${CONFIG.baseUrl}/api/users/statistic/byQues/${examId}`,
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

export const getStatisticByStudentId = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/tests?examId=${examId}`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error)
        });
}

export const getAverage = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/users/statistic/average/${examId}`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error)
        });
}

export const getExam = (examId) => {
    return axios
        .get(`${CONFIG.baseUrl}/api/exams/${examId}`,
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error)
        });
}
