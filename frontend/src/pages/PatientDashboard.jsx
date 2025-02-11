import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
    Wallet,
    Upload,
    Activity,
    FileText,
    Calendar,
    PlusCircle,
    Database,
    Brain,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import LogoutButton from '../components/LogoutButton';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const PatientDashboard = () => {
    const [balance, setBalance] = useState(1000);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [healthData, setHealthData] = useState([]);
    const token = localStorage.getItem("token");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            type: 'Deposit',
            amount: '+500 QHT',
            date: '2024-01-25',
            status: 'Completed'
        },
        {
            id: 2,
            type: 'AI Diagnosis',
            amount: '-50 QHT',
            date: '2024-01-24',
            status: 'Completed'
        },
        {
            id: 3,
            type: 'Data Upload',
            amount: '-10 QHT',
            date: '2024-01-23',
            status: 'Completed'
        }
    ]);

    const getFileType = (filePath) => {
        if (filePath.toLowerCase().endsWith('.pdf')) return 'pdf';
        if (filePath.toLowerCase().endsWith('.docx')) return 'doc';
        if (filePath.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) return 'image';
        return 'other';
    };

    const handleViewFile = (fileData) => {
        setSelectedFile(fileData);
        setIsViewModalOpen(true);
    };

    // Fetch health data
    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/getHealthData', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setHealthData(response.data.data);
            } catch (error) {
                console.error('Error fetching health data:', error);
            }
        };

        fetchHealthData();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/auth/uploadHealthData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                }
            });

            toast.success('Health data uploaded successfully!');

            // Refresh health data
            const response = await axios.get('http://localhost:8000/auth/getHealthData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setHealthData(response.data.data);
        } catch (error) {
            toast.error('Failed to upload health data');
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            {/* AI Diagnostics Promotion */}
            <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="space-y-2 mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold">Try AI Diagnostics</h3>
                            <p className="text-blue-100">
                                Get instant health insights using our advanced AI system
                            </p>
                        </div>
                        <Button variant="secondary" className="bg-white text-green-600 hover:bg-blue-50">
                            Start Analysis
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
                    <p className="text-gray-500">Manage your health data and QHT balance</p>
                </div>
                <div className="bg-black text-white px-4 py-2 rounded-md ml-2">
                    <LogoutButton />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* QHT Balance */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">QHT Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{balance} QHT</div>
                        <p className="text-xs text-gray-500">Available for transactions</p>
                    </CardContent>
                </Card>

                {/* Upload Health Data */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Data</CardTitle>
                        <Database className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{healthData.length}</div>
                        <p className="text-xs text-gray-500">Records uploaded</p>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                        <Activity className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{transactions.length}</div>
                        <p className="text-xs text-gray-500">Transactions this month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Health Data Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Health Data Management</CardTitle>
                        <CardDescription>Upload and manage your health records</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Upload Button */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                            <input
                                type="file"
                                id="health-data"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                            <label
                                htmlFor="health-data"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-600">
                                    Click to upload health data
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    PDF, JPG, PNG, DOC up to 10MB
                                </span>
                            </label>
                        </div>

                        {/* Upload Progress */}
                        {isUploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <Progress value={uploadProgress} />
                            </div>
                        )}

                        {/* Recent Uploads */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Recent Uploads</h3>
                            {healthData.length > 0 ? (
                                <div className="border rounded-lg divide-y">
                                    {healthData.slice(0, 3).map((data, index) => (
                                        <div key={index} className="flex items-center justify-between p-3">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium">{data.file[0].split('/').pop()}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(data.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewFile(data)}
                                            >
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No health data uploaded yet</p>
                            )}

                            {/* Updated Dialog component */}
                            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                                <DialogContent className="max-w-4xl w-full" aria-describedby={undefined}>
                                    <DialogHeader>
                                        <DialogTitle>{selectedFile?.file[0].split('/').pop()}</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        {selectedFile && (
                                            (() => {
                                                const filePath = selectedFile.file[0];
                                                const fileType = getFileType(filePath);

                                                switch (fileType) {
                                                    case 'pdf':
                                                        return (
                                                            <embed
                                                                src={`http://localhost:8000${filePath}`}
                                                                className="w-full h-[600px]"
                                                                title="PDF viewer"
                                                            />
                                                        );
                                                    case 'image':
                                                        return (
                                                            <img
                                                                src={`http://localhost:8000${filePath}`}
                                                                alt="Uploaded file"
                                                                className="max-w-full h-auto"
                                                            />
                                                        );
                                                    case 'doc':
                                                        return (
                                                            <div className="text-center py-8">
                                                                <p>This is a .docx file. You can download it:</p>
                                                                <a
                                                                    href={`http://localhost:8000${filePath}`}
                                                                    download
                                                                    className="text-blue-600 underline"
                                                                >
                                                                    Download .docx File
                                                                </a>
                                                            </div>
                                                        );
                                                    default:
                                                        return (
                                                            <div className="text-center py-8">
                                                                This file type cannot be previewed
                                                            </div>
                                                        );
                                                }
                                            })()
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>View your recent QHT transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell className={transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                                {transaction.amount}
                                            </TableCell>
                                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${transaction.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PatientDashboard;