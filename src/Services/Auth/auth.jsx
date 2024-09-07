import axiosInstance from "../Axios/axiosInstance";

export async function register(data) {
    try {
        const response = await axiosInstance.post('/api/auth/register', data);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function login(data) {
    try {
        const response = await axiosInstance.post('/api/auth/login', data);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}


export async function demo() {
    try {
        const response = await axiosInstance.get('api/auth/home');
        return response;
    } catch (error) {
        console.error('Error in demo:', error);
        throw error;
    }
}
