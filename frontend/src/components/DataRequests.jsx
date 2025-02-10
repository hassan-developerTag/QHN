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
import { Input } from "@/components/ui/input";
import {
    Loader2,
    Search,
    Database,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Eye
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const DataRequests = () => {
    const [dataRequests, setDataRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    const fetchDataRequests = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/auth/admin/getAllDataRequests"
            );
            const data = response.data.data;
            setDataRequests(data);

            setStats({
                total: data.length,
                pending: data.filter(req => req.status === "pending").length,
                approved: data.filter(req => req.status === "approved").length,
                rejected: data.filter(req => req.status === "rejected").length,
            });
        } catch (error) {
            toast.error("Failed to fetch data requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `http://localhost:8000/auth/admin/approveDataRequest/${id}`
            );
            toast.success(response.data.message);
            fetchDataRequests();
        } catch (error) {
            toast.error("Failed to approve request");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `http://localhost:8000/auth/admin/rejectDataRequest/${id}`
            );
            toast.success(response.data.message);
            fetchDataRequests();
        } catch (error) {
            toast.error("Failed to reject request");
        } finally {
            setLoading(false);
        }
    };

    const filteredRequests = dataRequests.filter(
        request =>
            request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.dataType?.toLowerCase().includes(searchTerm.toLowerCase())
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
                        placeholder="Search by name, email or data type"
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
                        <Database className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-gray-500">Total data access requests</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-gray-500">Awaiting approval</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.approved}</div>
                        <p className="text-xs text-gray-500">Access granted</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.rejected}</div>
                        <p className="text-xs text-gray-500">Access denied</p>
                    </CardContent>
                </Card>
            </div>

            {/* Data Requests Table */}
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
                                    <TableHead>Requester</TableHead>
                                    <TableHead>Data Type</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((request) => (
                                    <TableRow key={request._id}>
                                        <TableCell className="font-medium">
                                            {request.partnerId.name}
                                            <div className="text-sm text-gray-500">{request.partnerId.email}</div>
                                        </TableCell>
                                        <TableCell>{request.dataType}</TableCell>
                                        <TableCell>{request.paymentAmount} QHT</TableCell>
                                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedRequest(request);
                                                        setShowDetails(true);
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button> */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleApprove(request._id)}
                                                    disabled={request.status === "approved"}
                                                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReject(request._id)}
                                                    disabled={request.status === "rejected"}
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
                        {searchTerm ? "No matching requests found." : "No data requests found."}
                    </div>
                )}
            </div>

            {/* Request Details Modal */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Request Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about the data access request
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm">Requester</h4>
                                    <p>{selectedRequest.partnerId.name}</p>
                                    <p className="text-sm text-gray-500">{selectedRequest.partnerId.email}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Status</h4>
                                    <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Data Type</h4>
                                    <p>{selectedRequest.dataType}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Payment Amount</h4>
                                    <p>{selectedRequest.paymentAmount} QHT</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm mb-2">Research Purpose</h4>
                                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                    {selectedRequest.purpose}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm mb-2">Timeline</h4>
                                <div className="text-sm text-gray-600">
                                    <p>Requested: {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                    {selectedRequest.updatedAt !== selectedRequest.createdAt && (
                                        <p>Last Updated: {new Date(selectedRequest.updatedAt).toLocaleString()}</p>
                                    )}
                                </div>
                            </div>

                            {selectedRequest.status === 'pending' && (
                                <div className="flex justify-start gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleApprove(selectedRequest._id);
                                            setShowDetails(false);
                                        }}
                                        className="bg-green-50 text-green-700"
                                    >
                                        Approve Request
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleReject(selectedRequest._id);
                                            setShowDetails(false);
                                        }}
                                        className="bg-red-50 text-red-700"
                                    >
                                        Reject Request
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DataRequests;