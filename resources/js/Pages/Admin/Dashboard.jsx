import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ user }) {
    return (
        <AuthenticatedLayout>
        <div className="container mt-4">
            <h1 className="text-primary mb-3">Admin Dashboard</h1>
            <p className="lead">Welcome back, <strong>{user.first_name}, {user.last_name}</strong></p>
        </div>
        </AuthenticatedLayout>
    );
}
