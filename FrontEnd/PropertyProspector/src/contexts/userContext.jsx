import { apiLogin } from "../components/Login/apiLogin";

import { useContext, useState, createContext } from "react";
const UserContext = createContext()

export function UserProvider({ children }) {


    const [user, setUser] = useState(null)
    const handleLogin = async (userEmail, userPassword, callbackFunc, onErrorFunc) => {

        apiLogin(userEmail, userPassword).then((response) => {
            setUser({ username: response.username })
    
        }).catch((error) => { onErrorFunc(error) });
        callbackFunc();
    };

    const handleLogout = ()=>{

        setUser(null)
    }
    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }} >{children}</UserContext.Provider>
    )
};

export function useUser() {
    return useContext(UserContext)
}