import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const navigate = useNavigate();
  const baseURL  = 'https://crud-ae-tech-interns-vzuj.vercel.app';

  // 1. Fetch list
  useEffect(() => {
    axios
      .get<Product[]>(`${baseURL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // 2. Delete handler that takes an ID
  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    setDeleting(id);
    setError(null);

    axios
      .delete(`${baseURL}/api/products/${id}`)
      .then(() => {
        // remove from local state
        setProducts(prev => prev.filter(p => p.id !== id));
      })
      .catch(() => setError('Failed to delete product'))
      .finally(() => setDeleting(null));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Loading…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(prod => (
          <div
            key={prod.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white flex justify-between"
          >
            <div>
              <h2 className="text-lg font-medium">{prod.name}</h2>
              <p className="text-gray-700 mt-2">{prod.description}</p>
              <p className="text-gray-600 mt-2">
                Price: ${prod.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Stock: {prod.stock}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to={`/update/${prod.id}`}
                className="text-blue-600 hover:underline"
              >
                Update
              </Link>

              <button
                onClick={() => handleDelete(prod.id)}
                disabled={deleting === prod.id}
                className={`
                  bg-red-600 text-white py-1 px-3 rounded
                  ${deleting === prod.id
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-red-700'}
                `}
              >
                {deleting === prod.id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/add"
          className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
}
