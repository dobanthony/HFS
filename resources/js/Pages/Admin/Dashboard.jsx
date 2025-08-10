import React from 'react';

export default function Dashboard({ user }) {
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="text-primary mb-3">Admin Dashboard</h1>
                    <p className="lead">Welcome back, <strong>{user.full_name}</strong> 👑</p>

                    <h4 className="mt-4">Admin Actions</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Manage Users</li>
                        <li className="list-group-item">View System Reports</li>
                        <li className="list-group-item">Adjust Settings</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
