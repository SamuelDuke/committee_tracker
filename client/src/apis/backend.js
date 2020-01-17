import axios from "axios";

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export default axios.create({
  baseURL: "http://localhost:8080"
});
