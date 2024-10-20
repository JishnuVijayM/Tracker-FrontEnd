import axiosInstance from "../Axios/axiosInstance";

export async function getUserList() {
    try {
        const response = await axiosInstance.get('/api/user/getUsers')
        return response.data;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function getProjectList() {
    try {
        const response = await axiosInstance.get('/api/project/getList')
        return response.data;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function createTask(data) {
    try {
        const response = await axiosInstance.post('/api/task/createTask', data)
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

//for grid
export async function getTaskList(id) {
    try {
        const response = await axiosInstance.get(`/api/task/fetchTaskList/${id}`);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function getTask(id) {
    try {
        const response = await axiosInstance.get(`/api/task/getTask/${id}`);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function editTask(id, data) {
    try {
        const response = await axiosInstance.post(`/api/task/editTask/${id}`, data);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function getDashboard() {
    try {
        const response = await axiosInstance.get(`/api/getDashboard`);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}

export async function getTaskForOverview() {
    try {
        const response = await axiosInstance.get(`/api/task/getAllTasksForOverview`);
        return response;
    } catch (error) {
        return error.response ? error.response : { status: 500, data: error };
    }
}