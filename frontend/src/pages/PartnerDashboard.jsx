import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    ClipboardList,
    Database,
    FileText,
    Clock,
    Wallet,
    CheckCircle2,
    XCircle,
    LogOut
} from 'lucide-react';
import LogoutButton from '../components/LogoutButton';

const PartnerDashboard = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [qhtBalance, setQhtBalance] = useState(() => {
        return Number(localStorage.getItem("qhtBalance")) || 5000;
    });
    const [dataRequests, setDataRequests] = useState([]);
    const token = localStorage.getItem("token");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            dataType: '',
            purpose: '',
            paymentAmount: ''
        }
    });

    // Fetch data requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://qhn.vercel.app/auth/partner/getDataRequest', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDataRequests(response.data.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to fetch data requests');
            }
        };

        fetchRequests();
    }, [token]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                'https://qhn.vercel.app/auth/partner/postDataRequest',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success('Data access request submitted successfully');
                reset();

                // Refresh requests list
                const updatedRequests = await axios.get('https://qhn.vercel.app/auth/partner/getDataRequest', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDataRequests(updatedRequests.data.data);

                if (response.data.data.paymentAmount) {
                    setQhtBalance(qhtBalance - response.data.data.paymentAmount)
                    localStorage.setItem("qhtBalance", qhtBalance - response.data.data.paymentAmount);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            pending: <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-100">Pending</Badge>,
            approved: <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">Approved</Badge>,
            rejected: <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100">Rejected</Badge>
        };
        return variants[status] || null;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
                    <p className="text-gray-500">Request access to anonymized health data</p>
                </div>
                <div className="flex items-center gap-4">
                    <Card className="w-full md:w-auto">
                        <CardContent className="p-4 flex items-center space-x-4">
                            <Wallet className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-500">QHT Balance</p>
                                <p className="text-lg font-semibold">{qhtBalance} QHT</p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className='bg-black text-white px-4 py-2 rounded-lg'>
                        <LogoutButton />
                    </div>
                </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dataRequests.filter(r => r.status === 'pending').length}
                        </div>
                        <p className="text-xs text-gray-500">Awaiting approval</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Approved Requests</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dataRequests.filter(r => r.status === 'approved').length}
                        </div>
                        <p className="text-xs text-gray-500">Ready to access</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Rejected Requests</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {dataRequests.filter(r => r.status === 'rejected').length}
                        </div>
                        <p className="text-xs text-gray-500">Need revision</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Request Data Access</CardTitle>
                        <CardDescription>Submit a new request for health data access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Data Type</label>
                                <Controller
                                    name="dataType"
                                    control={control}
                                    rules={{ required: 'Data type is required' }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className={errors.dataType ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Select data type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clinical">Clinical Records</SelectItem>
                                                <SelectItem value="diagnostic">Diagnostic Data</SelectItem>
                                                <SelectItem value="laboratory">Laboratory Results</SelectItem>
                                                <SelectItem value="imaging">Medical Imaging</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.dataType && (
                                    <p className="text-sm text-red-500 mt-1">{errors.dataType.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Research Purpose</label>
                                <Controller
                                    name="purpose"
                                    control={control}
                                    rules={{
                                        required: 'Research purpose is required',
                                        minLength: {
                                            value: 50,
                                            message: 'Please provide at least 50 characters'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Describe your research purpose and data usage"
                                            className={`h-32 ${errors.purpose ? "border-red-500" : ""}`}
                                        />
                                    )}
                                />
                                {errors.purpose && (
                                    <p className="text-sm text-red-500 mt-1">{errors.purpose.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Payment Amount (QHT)</label>
                                <Controller
                                    name="paymentAmount"
                                    control={control}
                                    rules={{
                                        required: 'Payment amount is required',
                                        min: {
                                            value: 100,
                                            message: 'Minimum payment amount is 100 QHT'
                                        },
                                        max: {
                                            value: qhtBalance,
                                            message: `Maximum amount cannot exceed your balance of ${qhtBalance} QHT`
                                        },
                                        validate: (value) => value <= qhtBalance || `Amount cannot exceed your balance of ${qhtBalance} QHT`
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Enter QHT amount"
                                            className={errors.paymentAmount ? "border-red-500" : ""}
                                            min="100"
                                            max="10000"
                                        />
                                    )}
                                />
                                {errors.paymentAmount && (
                                    <p className="text-sm text-red-500 mt-1">{errors.paymentAmount.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Request'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Request History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Request History</CardTitle>
                        <CardDescription>Track your data access requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {dataRequests.length > 0 ? (
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data Type</TableHead>
                                            <TableHead>Payment</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dataRequests.map((request) => (
                                            <TableRow key={request._id} className="cursor-pointer hover:bg-gray-50">
                                                <TableCell className="font-medium">{request.dataType}</TableCell>
                                                <TableCell>{request.paymentAmount} QHT</TableCell>
                                                <TableCell>{getStatusBadge(request.status)}</TableCell>
                                                <TableCell>
                                                    {new Date(request.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>No data requests yet</p>
                                <p className="text-sm">Submit your first request to get started</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PartnerDashboard;