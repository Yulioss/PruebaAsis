import axiosClient from "../../../app/api/axiosClient";

export const getSuppliers = async () => {

    const response = await axiosClient.get("/Supplier");

    return response.data;
};