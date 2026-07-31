import axiosClient from "../../../app/api/axiosClient";

const authService = {

    login: async (credentials) => {

        const response = await axiosClient.post(
            "/Auth/login",
            credentials);

        return response.data;
    }

};

export default authService;