// src/components/student/StudentRequirementsView.js

import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getToken } from '../../utils/api';
import './StudentRequirementsView.css'; // We'll create this file next

function StudentRequirementsView() {
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(''); // Tracks which doc is uploading
    const [file, setFile] = useState(null);

    const fetchRequirements = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/requirements/my-requirements`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch requirements status.');
            const data = await response.json();
            setRequirements(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequirements();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (documentType) => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(documentType);
        const formData = new FormData();
        formData.append('documentType', documentType);
        formData.append('document', file);

        try {
            const response = await fetch(`${API_BASE_URL}/requirements/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}` },
                body: formData,
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Upload failed.');
            }
            alert('File uploaded successfully! Status is pending review.');
            setFile(null); // Clear the file input
            fetchRequirements(); // Refresh the list
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setUploading('');
        }
    };
    
    const getStatusBadge = (status) => {
        const statusMap = {
            'lacking': 'bg-danger',
            'submitted': 'bg-warning text-dark',
            'approved': 'bg-success',
            'rejected': 'bg-danger',
        };
        return statusMap[status] || 'bg-secondary';
    };

    if (loading) return <p className="text-center mt-5">Loading your requirements...</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Requirements</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {requirements.map(req => (
                            <li key={req.documentType} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{req.documentType.replace(/_/g, ' ')}</h5>
                                    <span className={`badge ${getStatusBadge(req.status)}`}>
                                        {req.status}
                                    </span>
                                </div>
                                {req.status === 'lacking' && (
                                    <div className="upload-section">
                                        <input type="file" className="form-control" onChange={handleFileChange} />
                                        <button 
                                            className="btn btn-primary mt-2" 
                                            onClick={() => handleUpload(req.documentType)}
                                            disabled={uploading === req.documentType}
                                        >
                                            {uploading === req.documentType ? 'Uploading...' : 'Upload'}
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default StudentRequirementsView;