import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, FileText, UserCheck, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";

const KYCRequests = () => {
    const [kycRequests, setKycRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    const fetchKycRequests = async () => {
        try {
            const response = await axios.get(
                "https://qhn.vercel.app/auth/admin/getAllKYC"
            );
            const data = response.data.data;
            setKycRequests(data);

            setStats({
                total: data.length,
                pending: data.filter(req => req.kycStatus === "pending").length,
                approved: data.filter(req => req.kycStatus === "approved").length,
                rejected: data.filter(req => req.kycStatus === "rejected").length,
            });
        } catch (error) {
            toast.error("Failed to fetch KYC requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKycRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `https://qhn.vercel.app/auth/admin/approveKYC/${id}`
            );
            toast.success(response.data.message);
            fetchKycRequests();
        } catch (error) {
            toast.error("Failed to approve KYC");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `https://qhn.vercel.app/auth/admin/rejectKYC/${id}`
            );
            toast.success(response.data.message);
            fetchKycRequests();
        } catch (error) {
            toast.error("Failed to reject KYC");
        } finally {
            setLoading(false);
        }
    };

    const filteredRequests = kycRequests.filter(
        request =>
            request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const variants = {
            approved: <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>,
            pending: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>,
            rejected: <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
        };
        return variants[status] || null;
    };

    return (
        <>
            {/* Search bar */}
            <div className="p-4 border-b">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-gray-500">Total KYC requests received</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Loader2 className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-gray-500">Awaiting verification</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.approved}</div>
                        <p className="text-xs text-gray-500">Successfully verified</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <UserX className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.rejected}</div>
                        <p className="text-xs text-gray-500">Verification declined</p>
                    </CardContent>
                </Card>
            </div>

            {/* KYC Requests Table */}
            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                ) : filteredRequests.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="font-medium">
                                            {request.user.name}
                                        </TableCell>
                                        <TableCell>{request.user.email}</TableCell>
                                        <TableCell>{getStatusBadge(request.kycStatus)}</TableCell>
                                        <TableCell>
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleApprove(request._id)}
                                                    disabled={request.kycStatus === "approved"}
                                                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReject(request._id)}
                                                    disabled={request.kycStatus === "rejected"}
                                                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? "No matching requests found." : "No KYC requests found."}
                    </div>
                )}
            </div>
        </>
    );
};

export default KYCRequests;