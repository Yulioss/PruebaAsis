import axiosClient from "../../../app/api/axiosClient";

export const getCategories = async () => {

    const response = await axiosClient.get("/Category");

    return response.data;
};