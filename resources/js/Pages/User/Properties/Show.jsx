import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import UserNavbarLayout from '@/Layouts/UserNavbarLayout';
import PurchaseModal from '@/Components/PurchaseModal';

export default function Show({ property }) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [processing, setProcessing] = useState(false);

  function handlePurchase(formData) {
    setProcessing(true);
    router.post(route('user.properties.purchase', property.id), formData, {
      onSuccess: () => {
        setProcessing(false);
        setShowPurchaseForm(false);
        alert('Purchase request submitted successfully!');
      },
      onError: () => {
        setProcessing(false);
      },
    });
  }

  return (
    <UserNavbarLayout>
      <div className="container py-4">
        {/* Back Button */}
        <Link
          href={route('user.properties.index')}
          className="btn btn-outline-secondary mb-4 rounded-pill shadow-sm"
        >
          <i className="bi bi-arrow-left me-1"></i> Back to Properties
        </Link>

        <div className="row g-4">
          {/* Image Section */}
          <div className="col-lg-6">
            <div className="rounded overflow-hidden shadow-sm position-relative">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-100 property-img"
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: '450px' }}
                >
                  <span className="text-muted">No Image</span>
                </div>
              )}
              {/* Price Badge */}
              <div className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill bg-white bg-opacity-75 text-success fw-bold">
                ₱{property.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-6 d-flex flex-column">
            <h1 className="fw-bold text-primary">{property.title}</h1>
            <p className="text-muted mb-2">
              <i className="bi bi-geo-alt me-1"></i>
              {property.address}
            </p>

            {/* Features */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-light text-dark">
                <i className="bi bi-house-door me-1"></i>{property.bedrooms ?? '-'} Beds
              </span>
              <span className="badge bg-light text-dark">
                <i className="bi bi-droplet me-1"></i>{property.bathrooms ?? '-'} Baths
              </span>
              <span className="badge bg-light text-dark">
                <i className="bi bi-aspect-ratio me-1"></i>{property.area ?? '-'} sqm
              </span>
            </div>

            {/* Description */}
            <p className="text-secondary">
              {property.description || 'No description available.'}
            </p>

            {/* Listing Date */}
            <p className="small text-muted mt-auto">
              Listed on {property.created_at}
            </p>

            {/* Contact Agent Button */}
            <button className="btn btn-primary mt-3 w-100 rounded-pill shadow-sm mb-2">
              Contact Agent
            </button>

            {/* Purchase Button */}
            <button
              className="btn btn-outline-success w-100 rounded-pill"
              onClick={() => setShowPurchaseForm(true)}
            >
              Purchase Property
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        show={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
        onSubmit={handlePurchase}
        processing={processing}
      />
    </UserNavbarLayout>
  );
}
