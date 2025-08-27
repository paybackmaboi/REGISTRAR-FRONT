// src/components/admin/PendingRequestsView.js

import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getToken } from '../../utils/api';

function PendingRequestsView() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPendingRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/requests/pending-approval`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch requests.');
            const data = await response.json();
            setRequests(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleUpdateRequest = async (requestId, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/requests/${requestId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error(`Failed to ${status} request.`);
            
            // Refresh the list after update
            fetchPendingRequests();
            
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p>Loading pending requests...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Pending Document Requests</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>ID Number</th>
                                <th>Document Type</th>
                                <th>Date Requested</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length > 0 ? requests.map(req => (
                                <tr key={req.id}>
                                    <td>{`${req.student.user.lastName}, ${req.student.user.firstName}`}</td>
                                    <td>{req.student.user.idNumber}</td>
                                    <td>{req.documentType}</td>
                                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdateRequest(req.id, 'approved')}>Approve</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleUpdateRequest(req.id, 'rejected')}>Reject</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">No pending requests found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PendingRequestsView;