import axios from "axios";

const instance = axios.create({
  baseURL: "https://contest-hub-server-sable.vercel.app",
});

const useAxios = () => {
  return instance;
};

export default useAxios;