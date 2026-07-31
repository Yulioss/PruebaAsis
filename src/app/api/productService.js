import axiosClient from "./axiosClient";

export const getProducts=(params)=>{

    return axiosClient.get("/Product",{

        params
    });
}

export const getProduct=id=>{

    return axiosClient.get(`/Product/${id}`);
}

export const createProduct=data=>{

    return axiosClient.post("/Product",data);
}

export const updateProduct=(id,data)=>{

    return axiosClient.put(`/Product/${id}`,data);
}

export const deleteProduct=id=>{

    return axiosClient.delete(`/Product/${id}`);
}

export const generateProducts=quantity=>{

    return axiosClient.post(
    "/Product/bulk-generate",
    {
        quantity
    });
}