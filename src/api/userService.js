import axios from "axios"

// let baseUrl = "http://localhost:3000/api/users"
let baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export function loginUser(user) {
    return axios.post(baseUrl + "/login", user)
}
export function addUser() {
    return axios.post(baseUrl + "/signup")
}
export function getAllUsers(user) {
    return axios.get(baseUrl)
}

export const signUpUser = async (user) => {
    return axios.post(baseUrl, user);
  } 