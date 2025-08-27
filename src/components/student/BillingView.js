import React, { useState, useEffect } from 'react';
import { API_BASE_URL, getToken } from '../../utils/api';

function BillingView() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/accounting/my-balance`, {
                    headers: { 'Authorization': `Bearer ${getToken()}` }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch balance.');
                }
                const data = await response.json();
                setBalance(data.balance);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching balance:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    const fullName = localStorage.getItem('fullName') || 'Student';
    const course = localStorage.getItem('course') || 'N/A';

    return (
        <div className="container-fluid mt-5 py-4 px-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0"><i className="fas fa-file-invoice-dollar me-2"></i> Billing Information</h3>
                        </div>
                        <div className="card-body p-4">
                            {loading && <p className="text-center">Loading balance...</p>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            {balance !== null && (
                                <>
                                    <div className="row mb-3">
                                        <div className="col-sm-4"><strong>Student Name:</strong></div>
                                        <div className="col-sm-8">{fullName}</div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-sm-4"><strong>Course:</strong></div>
                                        <div className="col-sm-8">{course}</div>
                                    </div>
                                    <hr />
                                    <div className="text-center mt-4">
                                        <h4 className="text-muted">Current Outstanding Balance</h4>
                                        <h1 className={`display-4 fw-bold ${balance > 0 ? 'text-danger' : 'text-success'}`}>
                                            ₱ {parseFloat(balance).toFixed(2)}
                                        </h1>
                                        {balance > 0 ? (
                                            <p className="text-muted mt-2">Please settle your account at the accounting office.</p>
                                        ) : (
                                            <p className="text-success mt-2">Your account is fully paid. Thank you!</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingView;