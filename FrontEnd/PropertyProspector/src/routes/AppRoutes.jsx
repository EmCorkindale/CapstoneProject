import { Route, Routes } from "react-router-dom";
import Home  from "../pages/Home";
import { OpenHomes } from "../pages/openHomes";
import { PageNotFound } from "../pages/pageNotFound";
import Login from "../components/Login/Login"
import Register from "../components/SignUp/Register";
import { ClientDatabase } from "../pages/ClientDatabase";
import { Property } from "../pages/Property";


function AppRoutes() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/openHomes" element={<OpenHomes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/database" element={<ClientDatabase/>} />
            <Route path="/property" element={<Property/>}/>
            
            {/* </Route> */}
            {/* special route to handle if none of the above match */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </>
    )
}
export default AppRoutes;