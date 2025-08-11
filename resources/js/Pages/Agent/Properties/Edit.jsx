import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import AgentNavbarLayout from '@/Layouts/AgentNavbarLayout';

export default function Edit({ property }) {
  const [values, setValues] = useState({
    title: property.title || '',
    address: property.address || '',
    price: property.price || '',
    description: property.description || '',
    bedrooms: property.bedrooms || '',
    bathrooms: property.bathrooms || '',
    area: property.area || '',
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
      formData.append('image', image);
    }
    formData.append('_method', 'PUT');

    Inertia.post(`/properties/${property.id}`, formData, {
      forceFormData: true,
    });
  }

  return (
    <AgentNavbarLayout>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Edit Property</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3">
            {/* Title */}
            <div className="col-12">
              <label className="form-label">Title</label>
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
              <label className="form-label">Address</label>
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
              <label className="form-label">Price</label>
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
              <label className="form-label">Bedrooms</label>
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
              <label className="form-label">Bathrooms</label>
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
              <label className="form-label">Area (sqm)</label>
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
              <label className="form-label">Description</label>
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
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {property.image && (
                <div className="mt-3">
                  <img
                    src={`/storage/${property.image}`}
                    alt={property.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '300px' }}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary me-2">
                Update Property
              </button>
              <InertiaLink href="/properties" className="btn btn-secondary">
                Cancel
              </InertiaLink>
            </div>
          </div>
        </form>
      </div>
    </AgentNavbarLayout>
  );
}
