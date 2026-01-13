import axios from "axios";

let baseUrl = `${import.meta.env.VITE_API_URL}/meals`;

export function getMeals(limit, page) {
    let url = baseUrl;
    if (limit || page)
        url += "?";
    if (limit)
        url += "limit=" + limit;
    if (limit && page)
        url += "&";
    if (page)
        url += "page=" + page;
    return axios.get(url)
    // return axios.get(baseUrl + "/");
    
}
export function getPageCount() {
    return axios.get(`${baseUrl}/pages`)
}
export const addMeal = async (meal) => {
    return axios.post(baseUrl, meal);
  } 