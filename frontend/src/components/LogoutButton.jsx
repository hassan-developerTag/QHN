import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className="flex justify-between items-center">
            <LogOut className="h-4 w-4 mr-2 text-white" />
            Logout
        </button>
    );
};

export default LogoutButton;
