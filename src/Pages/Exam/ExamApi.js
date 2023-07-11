import axios from "axios"
import { API_URL } from "../../Constants"

const BASE_URL = API_URL + "/tests"

export const callCreateTest = async () => {
    try {
        const response = await axios.post(`${BASE_URL}`,{}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

export const callPostAnswers = async (testId, requestBody) => {
    try {
        const response = await axios.post(`${BASE_URL}/${testId}/answers`,
            {
                duration: requestBody.duration,
                answers: requestBody.answers,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.status
    } catch (error) {
        return console.log(error)
    }
}

export const callGetResult = async (testId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${testId}/result`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        return response.data
    } catch (error) {
        return console.log(error)
    }
}