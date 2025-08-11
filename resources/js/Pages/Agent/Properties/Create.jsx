import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    address: '',
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/properties', {
      forceFormData: true, // required for file uploads
    });
  };

  return (
    <div className="container mt-5">
      <h1>Create New Property</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            name="address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
            required
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
            required
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        {/* Bedrooms */}
        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input
            name="bedrooms"
            type="number"
            className="form-control"
            value={data.bedrooms}
            onChange={(e) => setData('bedrooms', e.target.value)}
          />
        </div>

        {/* Bathrooms */}
        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input
            name="bathrooms"
            type="number"
            className="form-control"
            value={data.bathrooms}
            onChange={(e) => setData('bathrooms', e.target.value)}
          />
        </div>

        {/* Area */}
        <div className="mb-3">
          <label className="form-label">Area (sqm)</label>
          <input
            name="area"
            type="number"
            step="0.1"
            className="form-control"
            value={data.area}
            onChange={(e) => setData('area', e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            onChange={(e) => setData('image', e.target.files[0])}
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>

        {/* Buttons */}
        <button type="submit" className="btn btn-primary" disabled={processing}>
          Save Property
        </button>
        <Link href="/properties" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}
