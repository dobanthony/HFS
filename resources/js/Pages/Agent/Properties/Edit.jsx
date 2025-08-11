import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import AgentNavbarLayout from "@/Layouts/AgentNavbarLayout";

export default function Edit({ property }) {
  const [values, setValues] = useState({
    title: property.title || "",
    address: property.address || "",
    price: property.price || "",
    description: property.description || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    area: property.area || "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT");

    Inertia.post(`/properties/${property.id}`, formData, {
      forceFormData: true,
    });
  }

  return (
    <AgentNavbarLayout>
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <i className="bi bi-pencil-square me-2"></i>
            <h4 className="mb-0">Edit Property</h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row g-3">
                {/* Title */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-card-text me-1"></i> Title
                  </label>
                  <input
                    name="title"
                    className="form-control"
                    value={values.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-geo-alt me-1"></i> Address
                  </label>
                  <input
                    name="address"
                    className="form-control"
                    value={values.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">
                    <i className="bi bi-cash-stack me-1"></i> Price (₱)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={values.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Bedrooms */}
                <div className="col-6 col-md-3">
                  <label className="form-label fw-bold">
                    <i className="bi bi-door-open me-1"></i> Bedrooms
                  </label>
                  <input
                    name="bedrooms"
                    type="number"
                    className="form-control"
                    value={values.bedrooms}
                    onChange={handleChange}
                  />
                </div>

                {/* Bathrooms */}
                <div className="col-6 col-md-3">
                  <label className="form-label fw-bold">
                    <i className="bi bi-droplet-half me-1"></i> Bathrooms
                  </label>
                  <input
                    name="bathrooms"
                    type="number"
                    className="form-control"
                    value={values.bathrooms}
                    onChange={handleChange}
                  />
                </div>

                {/* Area */}
                <div className="col-12 col-md-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-aspect-ratio me-1"></i> Area (sqm)
                  </label>
                  <input
                    name="area"
                    type="number"
                    step="0.1"
                    className="form-control"
                    value={values.area}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-file-text me-1"></i> Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Image */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    <i className="bi bi-image me-1"></i> Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {property.image && (
                    <div className="mt-3">
                      <div className="card shadow-sm border-0" style={{ maxWidth: "300px" }}>
                        <img
                          src={`/storage/${property.image}`}
                          alt={property.title}
                          className="card-img-top rounded-top"
                        />
                        <div className="card-body text-center p-2">
                          <small className="text-muted">Current Image</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-success me-2">
                    <i className="bi bi-check-circle me-1"></i> Update Property
                  </button>
                  <Link href="/properties" className="btn btn-secondary">
                    <i className="bi bi-x-circle me-1"></i> Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AgentNavbarLayout>
  );
}
