import axios from "axios"

// let baseUrl = "http://localhost:3000/api/users"
let baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export function loginUser(user) {
    return axios.post(baseUrl + "/login", user)  
}
// export function addUser() {
//     return axios.post(baseUrl + "/signup", user)
// }
export function getAllUsers() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return axios.get(baseUrl, {
        headers: {Authorization: currentUser?.token}
    });
}

export const signUpUser = async (user) => {
    return axios.post(baseUrl, user);
} 
  