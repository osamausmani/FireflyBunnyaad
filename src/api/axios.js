import axios from "axios";
import { baseUrlApi as baseUrl } from "./apiEndPoint";


export const AuthRequest = async (url, data) => {
    const response = await axios.post(`${baseUrl}${url}`, data)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return 0

        })
    return response;
}

export const PostRequest = async (url, data) => {
    const response = await axios.post(`${baseUrl}${url}`, data)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(error);
            return 0
        })
    return response;
}