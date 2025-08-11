import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AgentNavbarLayout from '@/Layouts/AgentNavbarLayout';

export default function PropertyCreate() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    price: '',
    property_type: 'house',
    bedrooms: 0,
    bathrooms: 0,
    area_size: '',
    year_built: '',
    status: 'available',
    images: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    Inertia.post('/agent/properties', form);
  }

  return (
    <AgentNavbarLayout>
    <div className="container mt-4">
      <h1>Create New Property</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows={3} />
        </div>

        <div className="mb-3">
          <label className="form-label">Street Address</label>
          <input name="street_address" value={form.street_address} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input name="city" value={form.city} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">State</label>
          <input name="state" value={form.state} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">ZIP Code</label>
          <input name="zip_code" value={form.zip_code} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Property Type</label>
          <select name="property_type" value={form.property_type} onChange={handleChange} className="form-select" required>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input name="bedrooms" type="number" min={0} value={form.bedrooms} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input name="bathrooms" type="number" min={0} value={form.bathrooms} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Area Size (sq ft or m²)</label>
          <input name="area_size" type="number" min={0} value={form.area_size} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Year Built</label>
          <input name="year_built" type="number" min={1800} max={new Date().getFullYear()} value={form.year_built} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-select" required>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* For images you can add file uploads here later */}

        <button type="submit" className="btn btn-primary">Create Property</button>
      </form>
    </div>
    </AgentNavbarLayout>
  );
}
