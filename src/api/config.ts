import { API_KEY } from "@env";
import axios from "axios";

export const URL = "https://api.themoviedb.org/";
export const API = "3/";
export const api = axios.create({
  baseURL: URL + API,
});

api.interceptors.request.use(async (request) => {
  console.log(`
-------------
API CALL >>> ${request.baseURL}${request.url}
Method: ${request.method}
Params: ${JSON.stringify(request.params, null, 2)}
-------------
`);

  request.headers.Authorization = API_KEY;
  console.log(request.headers);
  return request;
});

export default api;
