import React from 'react';

export default function Dashboard({ user }) {
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="text-info mb-3">Agent Dashboard</h1>
                    <p className="lead">Hello, <strong>{user.full_name}</strong> 🕵️</p>

                    <h4 className="mt-4">Your Tasks</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">View Assigned Leads</li>
                        <li className="list-group-item">Update Client Status</li>
                        <li className="list-group-item">Submit Reports</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
