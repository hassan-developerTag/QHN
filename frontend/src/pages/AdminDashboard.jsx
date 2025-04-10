import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, LogOut } from 'lucide-react';
import LogoutButton from "../components/LogoutButton";
import KYCRequests from '../components/KYCRequests';
import DataRequests from '../components/DataRequests';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('kyc');

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header with Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage KYC and Data Access Requests</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-black text-white px-4 py-2 rounded-md">
                        <LogoutButton />
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-sm">
                <Button
                    variant={activeTab === 'kyc' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('kyc')}
                    className="flex items-center gap-2"
                >
                    <Users className="h-4 w-4" />
                    KYC Requests
                </Button>
                <Button
                    variant={activeTab === 'data' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('data')}
                    className="flex items-center gap-2"
                >
                    <FileText className="h-4 w-4" />
                    Data Requests
                </Button>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-lg shadow-sm">
                {activeTab === 'kyc' ? (
                    <KYCRequests />
                ) : (
                    <DataRequests />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;