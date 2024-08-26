import { useState } from "react";
import { GetStaticProps } from "next";
import { getEntries } from "../lib/contentful";
import Link from "next/link";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Product } from "@/lib/types";
import { Heart, ShoppingBasket } from "lucide-react";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

type Props = {
  products: Product[];
};

const Home: React.FC<Props> = ({ products }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuickView, setOpenQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const route = useRouter()

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

  const displayedProducts = products
    .filter(product =>
      product.fields.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 14);

    console.log(
      products.map((product) => {
        return product.fields.category.fields.name
      })
    )
    console.log(
      products.map((product) => {
        const subCategory = product.fields.subcategory
        return subCategory.map((sub) => {
          return sub.fields.name
        })
      })
    )
  const handleOpenQuickViewModal = (product: Product) => {
    return () => {
      setSelectedProduct(product);
      setOpenQuickView(true);
    }
  }

  const handleAllProducts = () => {
    route.push('/allProducts')
  }

  return (
    <div className="">
      <Navbar />
      <Hero onSearch={(query) => setSearchTerm(query)} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((product) => (
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
                  onClick={handleOpenQuickViewModal(product)}
                >
                  <p className="text-center ">Quick view</p>
                </div>
              </div>
              <h3 className="text-md font-semibold text-center">
                {product.fields.title}
              </h3>
              <p className="text-gray-600 text-center text-xl">₦ {product.fields.price}</p>

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

            </div>
          ))}
        </div>

        <div className="flex justify-center mb-4 mt-6">
        <Button className="bg-[#009E7F] mx-auto text-xl py-4 rounded-none w-1/3 h-[2.7em]" onClick={handleAllProducts}>View all</Button>
        </div>
      </div>
      <Footer />

      {selectedProduct && (
        <QuickViewModal
          open={openQuickView}
          setOpen={setOpenQuickView}
          productData={selectedProduct}
        />
      )}
    </div>

  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getEntries("product");
  return { props: { products } };
};

export default Home;
