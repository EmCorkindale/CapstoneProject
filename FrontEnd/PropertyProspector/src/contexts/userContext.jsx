import { apiLogin } from "../components/Login/apiLogin";
import { useContext, useState, createContext } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUser = !storedToken || !storedUsername
        ? null
        : { username: storedUsername, token: storedToken };

    const [user, setUser] = useState(storedUser);
    const [handleSuccess, setHandleSuccess] = useState(false);

    const handleLogin = async (userEmail, userPassword, onErrorFunc) => {
        try {
            const response = await apiLogin(userEmail, userPassword);
            setUser({ username: response.username, token: response.token });
            setHandleSuccess(true);
        } catch (error) {
            onErrorFunc(error);
            setHandleSuccess(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setHandleSuccess(false);
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleSuccess }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
