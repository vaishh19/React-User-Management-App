import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// Get All Users
// =======================

export const getUsers = async () => {
  try {
    const response = await api.get("/");
    return response;
  } catch (error) {
    console.error("Fetch Users Error:", error);
    throw error;
  }
};

// =======================
// Add User
// =======================

export const addUser = async (user) => {
  try {
    const response = await api.post("/", user);
    return response;
  } catch (error) {
    console.error("Add User Error:", error);
    throw error;
  }
};



export const updateUser = async (id, user) => {
  try {
    return await api.put(`/${id}`, user);
  } catch (error) {
    console.error("Update User Error:", error);
    return { data: user };
  }
};


export const deleteUser = async (id) => {
  try {
    return await api.delete(`/${id}`);
  } catch (error) {
    console.error("Delete User Error:", error);
    return { data: {} };
  }
};