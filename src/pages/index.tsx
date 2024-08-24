import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import { getEntries } from "../lib/contentful";
import Link from "next/link";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Product } from "@/lib/types";
import { Heart, ShoppingBasket } from "lucide-react";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });


type Props = {
  products: Product[];
};

const Home: React.FC<Props> = ({ products }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  console.log(products);

  const displayedProducts = products.slice(0, 14);

  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
            <div
              key={product.sys.id}
              className="relative p-4 flex flex-col gap-4 rounded-md transition duration-300 ease-in-out cursor-pointer"
            >
              <Link href={`/product/${product.sys.id}`}>
                <img
                  src={product.fields.productImage.fields.file.url}
                  alt={product.fields.title}
                  className="w-full h-40 object-cover object-center mb-4 rounded-md"
                />
                <h3 className="text-md font-semibold">
                  {product.fields.title}
                </h3>
                <p className="text-gray-600">₦ {product.fields.price}</p>

                <p className="">
                  {truncateDescription(
                    product.fields.description.content[0].content[0].value,
                    50
                  )}
                </p>

                <button
                  className="bg-primary text-white px-4 py-2 rounded-md mt-2 inline-flex gap-2 items-center w-full justify-center"
                  onClick={() =>
                    console.log(`Order Now: ${product.fields.title}`)
                  }
                >
                  <span>
                    <ShoppingBasket />
                  </span>
                  Order Now
                </button>
                <div className="flex items-center mt-2 absolute p-4 right-0 top-0">
                  {favorites.includes(product.sys.id) ? (
                    <Heart
                      fill="red"
                      className="text-red-500 cursor-pointer h-6 w-6"
                      onClick={() => toggleFavorite(product.sys.id)}
                    />
                  ) : (
                    <Heart
                      className="text-red-500 cursor-pointer h-6 w-6"
                      onClick={() => toggleFavorite(product.sys.id)}
                    />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* <ul>
        {products.map((product) => (
          <li key={product.sys.id} className="mb-4">
            <Link href={`/product/${product.sys.id}`} className="text-blue-500">
              {product.fields.title} - ${product.fields.price}
            </Link>
          </li>
        ))}
      </ul> */}
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getEntries("product");
  return { props: { products } };
};

export default Home;
