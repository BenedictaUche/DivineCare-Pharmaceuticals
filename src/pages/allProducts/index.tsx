import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Product } from '@/lib/types';
import { GetStaticProps } from 'next';
import { getEntries } from '@/lib/contentful';

type Props = {
  products: Product[];
};

const AllProducts: React.FC<Props> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract subcategories from products
  const categories = products.reduce((acc: { name: string, id: string }[], product) => {
    product.fields.subcategory.forEach((subcategory: any) => {
      if (!acc.some(cat => cat.id === subcategory.fields.name.toLowerCase())) {
        acc.push({ name: subcategory.fields.name, id: subcategory.fields.name.toLowerCase() });
      }
    });
    return acc;
  }, []);

  // Ensure "All" category is included
  if (!categories.some(cat => cat.id === 'all')) {
    categories.unshift({ name: 'All', id: 'all' });
  }

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product =>
        product.fields.subcategory.some((subcategory: any) => subcategory.fields.name.toLowerCase() === selectedCategory)
      );

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r mt-20 flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4">Filter by</h2>
          <hr />
          <ul className='border-t-slate-400 border-t'>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer py-2 ${selectedCategory === category.id ? "font-semibold" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.sys.id}
                className="relative p-4 flex flex-col gap-2 rounded-md transition duration-300 ease-in-out cursor-pointer"
              >
                <div className="img-container bg-[#f5f5f5] py-10 px-4 relative">
                  <img
                    src={product.fields.productImage.fields.file.url}
                    alt={product.fields.title}
                    className="w-full h-40 object-cover object-center mb-4 rounded-md"
                  />
                  <div
                    className="quickView bg-[#fafafa] absolute bottom-0 left-0 right-0 py-4"
                    onClick={() => console.log('Quick view')}
                  >
                    <p className="text-center">Quick view</p>
                  </div>
                </div>
                <h3 className="text-md font-semibold text-center">
                  {product.fields.title}
                </h3>
                <p className="text-gray-600 text-center text-xl">₦ {product.fields.price}</p>
                <button
                  className="bg-[#22c55e] rounded-none text-white px-4 py-2 mt-2 inline-flex gap-2 items-center w-full justify-center"
                  onClick={() => console.log(`Order Now: ${product.fields.title}`)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getEntries("product");
  return { props: { products } };
};

export default AllProducts;
