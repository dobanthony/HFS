import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ user }) {
    return (
        <AuthenticatedLayout>
            <div className="container mt-4">
                <h1 className="text-info mb-3">Agent Dashboard</h1>
                <p className="lead">Hello, <strong>{user.first_name}</strong></p>
            </div>
        </AuthenticatedLayout>
    );
}
