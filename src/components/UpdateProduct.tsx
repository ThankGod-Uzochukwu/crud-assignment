// src/components/ProductEditForm.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
}

export default function UpdateProduct() {
  // const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  // const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState('');

  // Base URL
  const baseURL = 'https://crud-ae-tech-interns-vzuj.vercel.app';

  // Fetch on mount
  // useEffect(() => {
  //   axios
  //     .get<Product>(`${baseURL}/api/products/${productId}`)
  //     .then((res) => {
  //       const prod = res.data;
  //       setProduct(prod);
  //       setName(prod.name);
  //       setDescription(prod.description);
  //       setPrice(prod.price);
  //       setStock(prod.stock);
  //     })
  //     .catch(() => {
  //       setError('Failed to load product');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [productId]);

  // Handle save
  // const handleSave = () => {
  //   if (!product) return;
  //   setSaving(true);
  //   setError(null);

  //   const updated: Product = { id: product.id, name, description, price, stock };

  //   axios
  //     .put<Product>(`${baseURL}/api/products/${product.id}`, updated)
  //     .then(() => {
  //       navigate(-1);
  //     })
  //     .catch(() => {
  //       setError('Failed to save changes');
  //     })
  //     .finally(() => {
  //       setSaving(false);
  //     });
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      {/* <p className="text-2xl font-semibold">Edit Product #{productId}</p> */}

      {/* Name */}
      <div>
        <p className="text-gray-700 mb-1">Name</p>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 mb-1">Description</p>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Price & Stock */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <p className="text-gray-700 mb-1">Price</p>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 mb-1">Stock</p>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      {/* Save */}
      <div>
        <button
          // onClick={handleSave}
          disabled={saving}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
