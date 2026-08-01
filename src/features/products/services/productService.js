import axiosClient from "../../../app/api/axiosClient";

const productService = {
    
}
export const getProducts = async (params) => {

    const response = await axiosClient.get("/Product", {
        params
    });

    return response.data;
};

export const getProduct = async (id) => {

    const response = await axiosClient.get(`/Product/${id}`);

    return response.data;
};

export const createProduct = async (data) => {

    const response = await axiosClient.post("/Product", data);

    return response.data;
};

export const updateProduct = async (id, data) => {

    const response = await axiosClient.put(`/Product/${id}`, data);

    return response.data;
};

export const deleteProduct = async (id) => {

    const response = await axiosClient.delete(`/Product/${id}`);

    return response.data;
};

export const generateProducts = async (quantity) => {

    const response = await axiosClient.post(
        "/Product/bulk-generate",
        {
            quantity
        });

    return response.data;
};
