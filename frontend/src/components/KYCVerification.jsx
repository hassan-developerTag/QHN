import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KYCVerification = () => {
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const documentTypes = [
    { type: 'id', label: 'Government ID', description: 'Passport, Driver\'s License, or National ID' },
    { type: 'proof_address', label: 'Proof of Address', description: 'Utility Bill or Bank Statement (last 3 months)' },
    { type: 'selfie', label: 'Selfie', description: 'Clear photo of your face' }
  ];

  const handleDrag = (e) => {
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    // console.log("Handledrop", e)
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files?.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file =>
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    setDocuments(prev => [...prev, ...validFiles]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const formData = new FormData();
    documents.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      const response = await axios.post(
        "https://qhn.vercel.app/auth/postKYCDocuments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
        setDocuments([]);
        navigate("/login")
      }

    } catch (error) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">KYC Verification</CardTitle>
          <CardDescription>
            Please provide the following documents to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Requirements */}
            <div className="space-y-4">
              {documentTypes.map((doc) => (
                <div key={doc.type} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{doc.label}</h3>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                  <CheckCircle2
                    className={`w-5 h-5 ${documents.length > 0 ? 'text-green-500' : 'text-gray-300'}`}
                  />
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center
                ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                ${documents.length > 0 ? 'border-green-300' : ''}`}
            >
              <input
                type="file"
                id="documents"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your documents here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports: PNG, JPG, PDF (Max 10MB each)
              </p>
            </div>

            {/* Document Preview */}
            {documents.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Uploaded Documents</h3>
                <div className="space-y-2">
                  {documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                          {file.type.startsWith('image/') ? '🖼️' : '📄'}
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || documents.length === 0}
              className={`w-full py-3 px-4 text-white rounded-lg 
                ${documents.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'}
                ${isSubmitting && 'opacity-50 cursor-wait'}`}
            >
              {isSubmitting ? 'Uploading...' : 'Submit Documents'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCVerification;