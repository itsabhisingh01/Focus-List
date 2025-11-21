import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedRoute><App/></ProtectedRoute>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
    </BrowserRouter>
);
}