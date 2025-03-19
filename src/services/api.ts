import axios, { AxiosError } from "axios";

const URL = process.env.REACT_APP_BASE_URL

interface LoginResponse {
    jwt?: string;
    user?: {
        id: number;
        username: string;
        email: string;
    };
    message?: string
}

interface ValidateTokenResponse {
    confirmed?: boolean
}

interface addTaskResponse {
    data?: {
        id: number,
        documentId: string,
        Title: string,
        Description: string,
        TaskStatus: string
    },
    message?: string

}
// async function apiCall(method: String, path: String, body: String) {
//     switch (method) {
//         case "GET":
//             try {
//                 const response = await axios.post(URL || "http://localhost:1337" + path, body);
//                 return response.data;
//             } catch (error) {
//                 if (error instanceof AxiosError && error.response) {
//                     return { message: error.response.data.error.message || "An error occurred during login" };
//                 }
//                 // Fallback for non-Axios errors
//                 return { message: "An unknown error occurred" };
//             }
//     }
// }
export const handleLogin = async (username: string, password: string): Promise<LoginResponse> => {
    const body = {
        "identifier": username,
        "password": password
    }
    try {
        const response = await axios.post(`${URL}/api/auth/local`, body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return { message: error.response.data.error.message || "An error occurred during login" };
        }
        // Fallback for non-Axios errors
        return { message: "An unknown error occurred" };
    }
}

export const HandleRegistration = async (username: string, password: string, email: string): Promise<LoginResponse> => {
    const body = {
        "username": username,
        "email": email,
        "password": password
    }
    try {
        const response = await axios.post(`${URL}/api/auth/local/register`, body);
        return response.data;
    } catch (error) {
        console.log('error', error)
        if (error instanceof AxiosError && error.response) {
            return { message: error.response.data.error.message || "An error occurred during login" };
        }
        // Fallback for non-Axios errors
        return { message: "An unknown error occurred" };
    }

}

export const validateToken = async (token: string): Promise<ValidateTokenResponse> => {
    try {

        const response = await axios.get(`${URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (error) {
        return { confirmed: false }
    }
}


export const AddtaskHandler = async (title: string, description: string, status: string): Promise<addTaskResponse> => {
    const body = {
        data: {
            Title: title,
            Description: description,
            TaskStatus: status,
        }
    }
    try {
        const addTaskResponse = await axios.post(`${URL}/api/tasks`, body)
        return addTaskResponse.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return { message: error.response.data.error.message || "An error occurred during adding a task" };
        }
        // Fallback for non-Axios errors
        return { message: "An unknown error occurred" };
    }
}