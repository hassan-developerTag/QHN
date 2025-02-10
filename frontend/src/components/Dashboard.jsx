import React from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import PatientDashboard from "../pages/PatientDashboard";
import PartnerDashboard from "../pages/PartnerDashboard";

const Dashboard = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    if (!role) {
        navigate("/");
        return null;
    }

    return (
        <div className="p-6">
            {role === "admin" && <AdminDashboard />}
            {role === "patient" && <PatientDashboard />}
            {role === "partner" && <PartnerDashboard />}
        </div>
    );
};

export default Dashboard;
