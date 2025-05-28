// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
}

export default function UpdateFew() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  // track which row is saving
  const [savingId, setSavingId] = useState<number | null>(null);

  const baseURL = 'https://crud-ae-tech-interns-vzuj.vercel.app';

  // fetch once on mount
  useEffect(() => {
    axios
      .get<Product[]>(`${baseURL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // when price/stock inputs change
  const updateLocalField = (
    id: number,
    field: 'price' | 'stock',
    value: string
  ) => {
    setProducts(ps =>
      ps.map(p =>
        p.id === id
          ? {
              ...p,
              [field]: field === 'price' ? Number(value) : value,
            }
          : p
      )
    );
  };

  // PATCH only price and stock
  const handlePatch = async (prod: Product) => {
    setSavingId(prod.id);
    setError(null);
    try {
      const { price, stock, id } = prod;
      await axios.patch<Product>(
        `${baseURL}/api/products/${id}`,
        { price, stock }
      );
      // optionally you could re-fetch or update local state from response
    } catch {
      setError(`Failed to update ${prod.name}`);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <span className="text-gray-500">Loading…</span>
    </div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-screen">
      <span className="text-red-500">{error}</span>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Update Price and Stock only</h1>
      {products.map(prod => (
        <div
          key={prod.id}
          className="flex justify-between items-center p-4 bg-white border rounded-lg"
        >
          <div>
            <h2 className="text-lg font-medium">{prod.name}</h2>
            <p className="text-gray-700">{prod.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* price field */}
            <input
              type="number"
              value={prod.price}
              onChange={e => updateLocalField(prod.id, 'price', e.target.value)}
              className="w-20 border rounded px-2 py-1"
            />

            {/* stock field */}
            <input
              type="text"
              value={prod.stock}
              onChange={e => updateLocalField(prod.id, 'stock', e.target.value)}
              className="w-24 border rounded px-2 py-1"
            />

            {/* PATCH button */}
            <button
              onClick={() => handlePatch(prod)}
              disabled={savingId === prod.id}
              className={`ml-2 px-3 py-1 rounded text-white ${
                savingId === prod.id 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {savingId === prod.id ? 'Saving…' : 'Save'}
            </button>

            {/* Link to full edit form if needed */}
            <Link
              to={`/update/${prod.id}`}
              className="ml-4 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded"
            >
              Full Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
