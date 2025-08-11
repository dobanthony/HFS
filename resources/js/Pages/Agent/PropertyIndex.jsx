import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AgentNavbarLayout from '@/Layouts/AgentNavbarLayout';

export default function PropertyIndex({ properties }) {
  return (
    <AgentNavbarLayout>
        <div className="container mt-4">
        <h1>Your Properties</h1>

        <InertiaLink href="/agent/properties/create" className="btn btn-success mb-3">Add New Property</InertiaLink>

        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Title</th>
                <th>City</th>
                <th>Price</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {properties.data.length === 0 ? (
                <tr>
                <td colSpan="4" className="text-center">No properties found.</td>
                </tr>
            ) : (
                properties.data.map(property => (
                <tr key={property.id}>
                    <td>{property.title}</td>
                    <td>{property.city}</td>
                    <td>${property.price}</td>
                    <td>{property.status}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    </AgentNavbarLayout>
  );
}
