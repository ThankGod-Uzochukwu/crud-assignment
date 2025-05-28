import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product[]>('https://crud-ae-tech-interns-vzuj.vercel.app/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        {products.map((prod) => (
          <div
            key={prod.id}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white flex-row flex justify-between"
          >
            <div>
            <h2 className="text-lg font-medium">{prod.name}</h2>
            <p className="text-gray-700 mt-2">{prod.description}</p>
            <p className="text-gray-600 mt-2">price: ${prod.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">stock: {prod.stock}</p>
            </div>
            <div className="flex flex-column gap-3">
            <Link to={`/update/${prod.id}`}>Update</Link>
            <Link to='/add'>Delete</Link>
            </div>
          </div>
        ))}
      </div>

      <Link to='/add'>Add New Product</Link>

    </div>
  );
}
