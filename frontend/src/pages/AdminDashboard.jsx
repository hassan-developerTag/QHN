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





















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, Search, FileText, UserCheck, UserX } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import LogoutButton from "../components/LogoutButton";

// const AdminDashboard = () => {
//     const [kycRequests, setKycRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [stats, setStats] = useState({
//         total: 0,
//         pending: 0,
//         approved: 0,
//         rejected: 0,
//     });

//     const fetchKycRequests = async () => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:8000/auth/admin/getAllKYC"
//             );
//             const data = response.data.data;
//             setKycRequests(data);

//             // Calculate stats
//             setStats({
//                 total: data.length,
//                 pending: data.filter(req => req.kycStatus === "pending").length,
//                 approved: data.filter(req => req.kycStatus === "approved").length,
//                 rejected: data.filter(req => req.kycStatus === "rejected").length,
//             });
//         } catch (error) {
//             toast.error("Failed to fetch KYC requests");
//             console.error("Error fetching KYC requests:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     // Fetch KYC requests
//     useEffect(() => {

//         fetchKycRequests();
//     }, []);

//     const handleApprove = async (id) => {
//         try {
//             // console.log(approve)
//             setLoading(true);
//             const response = await axios.put(
//                 `http://localhost:8000/auth/admin/approveKYC/${id}`
//             );

//             toast.success(response.data.message);

//             fetchKycRequests()
//         } catch (error) {
//             toast.error("Failed to approve KYC");
//             console.error("Error approving KYC:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             setLoading(true);
//             const response = await axios.put(
//                 `http://localhost:8000/auth/admin/rejectKYC/${id}`
//             );

//             toast.success(response.data.message);

//             fetchKycRequests()
//         } catch (error) {
//             toast.error("Failed to reject KYC");
//             console.error("Error rejecting KYC:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Filter requests based on search term
//     const filteredRequests = kycRequests.filter(
//         request =>
//             request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             request.user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const getStatusBadge = (status) => {
//         const variants = {
//             approved: <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>,
//             pending: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>,
//             rejected: <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
//         };
//         return variants[status] || null;
//     };

//     return (
//         <div className="max-w-7xl mx-auto space-y-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">KYC Verification Dashboard</h1>
//                     <p className="text-gray-500">Manage and review KYC verification requests</p>
//                 </div>

//                 <div className="flex">
//                     <div className="relative w-full sm:w-64">
//                         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
//                         <Input
//                             placeholder="Search by name or email"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="pl-8"
//                         />
//                     </div>
//                     <div className="bg-black text-white px-4 pt-1 rounded-md ml-2">
//                         <LogoutButton />
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
//                         <FileText className="h-4 w-4 text-gray-500" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.total}</div>
//                         <p className="text-xs text-gray-500">Total KYC requests received</p>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Pending</CardTitle>
//                         <Loader2 className="h-4 w-4 text-yellow-500" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.pending}</div>
//                         <p className="text-xs text-gray-500">Awaiting verification</p>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Approved</CardTitle>
//                         <UserCheck className="h-4 w-4 text-green-500" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.approved}</div>
//                         <p className="text-xs text-gray-500">Successfully verified</p>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                         <CardTitle className="text-sm font-medium">Rejected</CardTitle>
//                         <UserX className="h-4 w-4 text-red-500" />
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-2xl font-bold">{stats.rejected}</div>
//                         <p className="text-xs text-gray-500">Verification declined</p>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* KYC Requests Table */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>KYC Requests</CardTitle>
//                     <CardDescription>
//                         View and manage all KYC verification requests
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     {loading ? (
//                         <div className="flex justify-center items-center p-8">
//                             <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
//                         </div>
//                     ) : filteredRequests.length > 0 ? (
//                         <div className="rounded-md border">
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Name</TableHead>
//                                         <TableHead>Email</TableHead>
//                                         <TableHead>Status</TableHead>
//                                         <TableHead>Submitted</TableHead>
//                                         <TableHead className="text-right">Actions</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {filteredRequests.map((request) => (
//                                         <TableRow key={request._id}>
//                                             <TableCell className="font-medium">
//                                                 {request.user.name}
//                                             </TableCell>
//                                             <TableCell>{request.user.email}</TableCell>
//                                             <TableCell>{getStatusBadge(request.kycStatus)}</TableCell>
//                                             <TableCell>
//                                                 {new Date(request.createdAt).toLocaleDateString()}
//                                             </TableCell>
//                                             <TableCell className="text-right">
//                                                 <div className="flex justify-end gap-2">
//                                                     <Button
//                                                         variant="outline"
//                                                         size="sm"
//                                                         onClick={() => handleApprove(request._id)}
//                                                         //   disabled={request.kycStatus !== "pending"}
//                                                         className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
//                                                     >
//                                                         Approve
//                                                     </Button>
//                                                     <Button
//                                                         variant="outline"
//                                                         size="sm"
//                                                         onClick={() => handleReject(request._id)}
//                                                         //   disabled={request.kycStatus !== "pending"}
//                                                         className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
//                                                     >
//                                                         Reject
//                                                     </Button>
//                                                 </div>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </div>
//                     ) : (
//                         <div className="text-center py-8 text-gray-500">
//                             {searchTerm ? "No matching requests found." : "No KYC requests found."}
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default AdminDashboard;