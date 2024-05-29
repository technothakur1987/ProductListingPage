"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactStars from 'react-stars';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.log(selectedProduct)
  }, [selectedProduct]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Product Listing</h1>
      <input
        type="text"
        value={search}
        name='search'
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-300 cursor-pointer hover:shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]"
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center my-4">No Products Found...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="border p-4 rounded cursor-pointer hover:shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full h-64 object-contain mb-4"
                    priority={index >= 0}
                  />
                  <h2 className="text-xl font-bold">{product.title}</h2>
                  <p className="text-gray-700">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg relative sm:w-3/4 ">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 text-5xl hover:text-black"
            >
              &times;
            </button>

            <Image
              src={selectedProduct.image}
              alt={selectedProduct.image}
              width={500}
              height={300}
              className="w-full h-64 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-center">{selectedProduct.title}</h2>
            <p className="mt-4 mb-4 text-justify">{selectedProduct.description}</p>
            <div className='flex items-center justify-around'>
              <p className="text-black-900 uppercase font-bold">{selectedProduct.category}</p>
              <div className='stars bg-transparent relative z-0'>
                <ReactStars
                  count={5}
                  value={selectedProduct.rating ? selectedProduct.rating.rate : 0}
                  size={40}
                  color2={'#ffd700'}
                />
              </div>
            </div>
            <p className="text-gray-700 text-center text-5xl  hover:text-black">${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
