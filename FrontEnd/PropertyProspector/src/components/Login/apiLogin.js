import axios from "axios";

export async function apiLogin(emailAddress, password) {
  const response = await axios.post("http://localhost:8080/api/users/login", {
    emailAddress: emailAddress,
    password: password,
  });
sessionStorage.setItem('token',response.data.token)
  // Return an object with token and username
  return {
    token: response.data.token,
    username: response.data.username,
  };
}
