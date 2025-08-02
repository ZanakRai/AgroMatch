import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/logout/", {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Logout response:", data.message);
                localStorage.removeItem("token");
                navigate("/");
            })
            .catch((error) => console.error("Logout error:", error));
    }, [navigate, token]);

    return <h2>Logging out...</h2>;
}

export default Logout;
