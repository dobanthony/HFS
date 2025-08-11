import React from 'react';
import { Link } from '@inertiajs/react';
import UserNavbarLayout from '@/Layouts/UserNavbarLayout';

export default function Index({ properties = [] }) {
  return (
    <UserNavbarLayout>
      {/* Hero Header */}
      <section className="bg-light border-bottom py-5 mb-4">
        <div className="container text-center">
          <h1 className="fw-bold text-primary display-5">Find Your Perfect Home</h1>
          <p className="text-muted fs-5">
            Explore {properties.length} {properties.length === 1 ? 'property' : 'properties'} waiting for you
          </p>
        </div>
      </section>

      <div className="container pb-5">
        {properties.length > 0 ? (
          <div className="row g-4">
            {properties.map((property) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={property.id}>
                <div className="property-card shadow-sm h-100 border-0 rounded-4 overflow-hidden position-relative">
                  {/* Image */}
                  <div className="position-relative overflow-hidden">
                    {property.image ? (
                      <img
                        src={property.image}
                        loading="lazy"
                        className="w-100 property-img"
                        alt={property.title}
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{ height: '220px' }}
                      >
                        <span className="text-muted">No Image</span>
                      </div>
                    )}

                    {/* Price Overlay */}
                    <div className="position-absolute top-0 start-0 m-2 px-3 py-1 rounded-pill bg-white bg-opacity-75 fw-bold text-success">
                      ₱{property.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title text-truncate mb-1">{property.title}</h5>
                    <p className="card-text text-muted small text-truncate">{property.address}</p>

                    {/* Features */}
                    <div className="d-flex flex-wrap gap-2 my-2">
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-house-door me-1"></i>{property.bedrooms} Beds
                      </span>
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-droplet me-1"></i>{property.bathrooms} Baths
                      </span>
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-aspect-ratio me-1"></i>{property.area} sqm
                      </span>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={route('user.properties.show', property.id)}
                        className="btn btn-primary w-100 rounded-pill"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-house-door text-primary fs-1 mb-3"></i>
            <h5 className="fw-bold">No properties found</h5>
            <p className="text-muted">Check back later or explore other categories.</p>
            <Link href="/dashboard" className="btn btn-outline-primary rounded-pill">
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style>{`
        .property-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .property-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .property-img {
          transition: transform 0.4s ease;
        }
        .property-card:hover .property-img {
          transform: scale(1.05);
        }
      `}</style>
    </UserNavbarLayout>
  );
}
