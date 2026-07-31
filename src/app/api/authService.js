import axiosClient from "./axiosClient";

export const login = async(data)=>{

    const response = await axiosClient.post(
        "/Auth/login",
        data);

    return response.data;
}