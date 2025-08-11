import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AgentNavbarLayout from "@/Layouts/AgentNavbarLayout";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    address: "",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setData(name, type === "file" ? files[0] : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/properties", {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <AgentNavbarLayout>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">
          <i className="bi bi-house-add me-2"></i>
          Create New Property
        </h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-4 rounded shadow-sm">
          <div className="row g-3">
            {/* Title */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-card-text me-1"></i> Title
              </label>
              <input
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={data.title}
                onChange={handleChange}
                required
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-geo-alt me-1"></i> Address
              </label>
              <input
                name="address"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                value={data.address}
                onChange={handleChange}
                required
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            {/* Price */}
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-cash-stack me-1"></i> Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                value={data.price}
                onChange={handleChange}
                required
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

            {/* Bedrooms */}
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-door-closed me-1"></i> Bedrooms
              </label>
              <input
                name="bedrooms"
                type="number"
                className="form-control"
                value={data.bedrooms}
                onChange={handleChange}
              />
            </div>

            {/* Bathrooms */}
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-droplet-half me-1"></i> Bathrooms
              </label>
              <input
                name="bathrooms"
                type="number"
                className="form-control"
                value={data.bathrooms}
                onChange={handleChange}
              />
            </div>

            {/* Area */}
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-aspect-ratio me-1"></i> Area (sqm)
              </label>
              <input
                name="area"
                type="number"
                step="0.1"
                className="form-control"
                value={data.area}
                onChange={handleChange}
              />
            </div>

            {/* Image */}
            <div className="col-md-8">
              <label className="form-label">
                <i className="bi bi-image me-1"></i> Image
              </label>
              <input
                type="file"
                name="image"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                onChange={handleChange}
              />
              {errors.image && <div className="invalid-feedback">{errors.image}</div>}
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">
                <i className="bi bi-pencil-square me-1"></i> Description
              </label>
              <textarea
                name="description"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                value={data.description}
                onChange={handleChange}
                rows="3"
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Buttons */}
            <div className="col-12 mt-3 d-flex justify-content-between">
              <button type="submit" className="btn btn-primary" disabled={processing}>
                <i className="bi bi-save me-1"></i> Save Property
              </button>
              <Link href="/properties" className="btn btn-secondary">
                <i className="bi bi-x-circle me-1"></i> Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AgentNavbarLayout>
  );
}
