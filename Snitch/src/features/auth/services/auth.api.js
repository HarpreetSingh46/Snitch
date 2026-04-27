import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
})

export async function register({ email, contact, password, username, isSeller }) {
  const payload = {
    email,
    contact,
    password,
    username,
    isSeller
  }

  console.log("SENDING DATA:", payload)
  const response = await authApiInstance.post("/register", payload)
  return response.data
}

export async function login({ email, password }) {

  const response = await authApiInstance.post("/login", {
    email,
    password

  })
  return response.data



}


export async function getMe() {
  const response = await authApiInstance.get("/me")
  return response.data
}