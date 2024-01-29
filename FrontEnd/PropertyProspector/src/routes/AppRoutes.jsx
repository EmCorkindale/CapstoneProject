import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { OpenHomes } from "../pages/OpenHomes"
import { PageNotFound } from "../pages/pageNotFound";
import Login from "../components/Login/Login"
import Register from "../components/SignUp/Register";
import { ClientDatabase } from "../pages/ClientDatabase";
import { Property } from "../pages/Property";
import { OpenHomeRegister } from "../components/OpenHomeComponents/OpenHomeRegister";


function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/openHomes" element={<OpenHomes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/database" element={<ClientDatabase />} />
                <Route path="/property" element={<Property />} />
                <Route path="/openHomeRegister/:propertyID" element={<OpenHomeRegister />} />



                {/* special route to handle if none of the above match */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}
export default AppRoutes;