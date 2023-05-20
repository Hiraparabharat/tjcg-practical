import axios from "axios";
import { toast } from "react-hot-toast";
import { store } from "../store";
import { logout } from "../store/reducer";

const Api = axios.create({
  baseURL: "http://localhost:8000/api",
});

Api.interceptors.request.use((req) => {
  const tk = store.getState()?.reducer?.tk;
  req.headers.Authorization = `Bearer ${tk}`;
  return req;
});

Api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(err);
    if (err?.response?.status === 401) {
      store.dispatch(logout());
    }
    toast.error(err?.response?.data?.message || err?.message);
    throw new Error(err);
  }
);

export default Api;

export const fetcher = async (data1) => {
  const [url, data = {}] = typeof data1 === "string" ? [data1] : data1;
  return Api.get(url, { params: data });
};
