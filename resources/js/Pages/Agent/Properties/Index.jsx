import React from 'react';
import { Link, router } from '@inertiajs/react';

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
    <div className="container mt-5">
      <h1>Properties</h1>
      <Link href="/properties/create" className="btn btn-primary mb-3">
        Add New Property
      </Link>

      {properties.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Address</th>
              <th>Price</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Area (sqm)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title || 'Property'}
                      style={{ width: '100px', height: 'auto' }}
                      className="img-thumbnail"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{property.title || '-'}</td>
                <td>{property.address || '-'}</td>
                <td>{property.price ?? '-'}</td>
                <td>{property.bedrooms ?? '-'}</td>
                <td>{property.bathrooms ?? '-'}</td>
                <td>{property.area ?? '-'}</td>
                <td>
                  <Link
                    href={property.edit_url}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(property.delete_url)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
