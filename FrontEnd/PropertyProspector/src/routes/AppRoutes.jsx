import { Route, Routes } from "react-router-dom";
import Home  from "../pages/Home";
import { OpenHomes } from "../pages/openHomes";
import { PageNotFound } from "../pages/pageNotFound";
import Login from "../components/Login/Login"


function AppRoutes() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/openHomes" element={<OpenHomes />} />
            <Route path="/login" element={<Login />} />
            {/* </Route> */}
            {/* special route to handle if none of the above match */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </>
    )
}
export default AppRoutes;