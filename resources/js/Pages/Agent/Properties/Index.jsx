import React from 'react';
import { Link, router } from '@inertiajs/react';
import AgentNavbarLayout from '@/Layouts/AgentNavbarLayout';

export default function Index({ properties = [] }) {
  const handleDelete = (url) => {
    if (confirm('Are you sure you want to delete this property?')) {
      router.delete(url, {
        preserveScroll: true,
        onSuccess: () => {
          alert('Property deleted successfully.');
        },
      });
    }
  };

  return (
    <AgentNavbarLayout>
      <div className="container py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold text-primary m-0">Properties</h1>
          <Link href="/properties/create" className="btn btn-primary shadow-sm">
            <i className="bi bi-plus-lg me-2"></i> Add New Property
          </Link>
        </div>

        {/* Property Table */}
        {properties.length > 0 ? (
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Address</th>
                  <th scope="col">Price</th>
                  <th scope="col">Bedrooms</th>
                  <th scope="col">Bathrooms</th>
                  <th scope="col">Area (sqm)</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="align-middle">
                    {/* Property Image */}
                    <td style={{ minWidth: '120px' }}>
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.title || 'Property'}
                          className="img-thumbnail"
                          style={{ maxWidth: '100px', height: 'auto' }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>

                    {/* Property Info */}
                    <td className="fw-semibold">{property.title || '-'}</td>
                    <td className="text-muted">{property.address || '-'}</td>
                    <td className="text-success fw-bold">
                      {property.price ? `₱${property.price.toLocaleString()}` : '-'}
                    </td>
                    <td>{property.bedrooms ?? '-'}</td>
                    <td>{property.bathrooms ?? '-'}</td>
                    <td>{property.area ?? '-'}</td>

                    {/* Actions */}
                    <td className="text-center" style={{ minWidth: '160px' }}>
                      <Link
                        href={property.edit_url}
                        className="btn btn-sm btn-warning me-2 shadow-sm"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger shadow-sm"
                        onClick={() => handleDelete(property.delete_url)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-house-door fs-1"></i>
            <p className="mt-3">No properties found.</p>
            <Link href="/properties/create" className="btn btn-outline-primary">
              <i className="bi bi-plus-lg me-2"></i> Add your first property
            </Link>
          </div>
        )}
      </div>
    </AgentNavbarLayout>
  );
}
