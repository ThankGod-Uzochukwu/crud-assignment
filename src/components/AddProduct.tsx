// src/components/ProductForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: string;
}

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!name || !description || price === '' || !stock) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const newProduct = { name, description, price: Number(price), stock };
      await axios.post<Product>(
        'https://crud-ae-tech-interns-vzuj.vercel.app/api/products',
        newProduct
      );
      setSuccess(true);
      // reset form
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
    } catch (err) {
      console.error(err);
      setError('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-600">Product added!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded h-24"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="text"
            value={stock}
            onChange={e => setStock(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
