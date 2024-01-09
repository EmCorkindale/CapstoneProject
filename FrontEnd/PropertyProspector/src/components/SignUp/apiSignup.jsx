import axios from "axios";


export async function apiSignup(username, firstName, lastName, password, emailAddress) {
   const response = await axios.post("http://localhost:8080/api/users/register", {
    username,
    password,
    firstName,
    lastName,
    emailAddress,
  });
return response.data
}
