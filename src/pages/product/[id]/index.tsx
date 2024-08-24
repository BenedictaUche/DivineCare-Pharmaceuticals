import { GetStaticPaths, GetStaticProps } from "next";
import { getEntries } from "@/lib/contentful";
import { addToCart } from "@/lib/cart";
import { useRouter } from "next/router";
import { Product } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, ShieldPlus, Star, Loader2Icon, Plus } from "lucide-react";
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from "react";
import cn from "clsx";
import { a } from "@react-spring/web";
import { useToast } from "@/components/ui/use-toast";
import CustomButton from "@/components/CustomButton";
import { ratingFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";
import FormRender from "@/components/FormRender";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Footer from "@/components/Footer";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

type Props = {
  product: Product;
};

const ProductPage: React.FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0); // State to hold the rating value
  const animation = { duration: 50000, easing: (t: number) => t };
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(
      product.sys.id,
      product.fields.instock,
      product.fields.title,
      product.fields.price
    );
    setIsLoading(false);
    toast({
      title: "Product added to cart",
      description: "You can view your cart by clicking the cart icon",
      variant: "default",
    });
  };

  const handleCheckout = () => {
    const message = `Order details: ${product.fields.title} - $${product.fields.price}`;
    const whatsappUrl = `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const form = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rating: "",
      review: "",
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ratingFormSchema>) => {
    const reviewData = {
      ...values,
      productId: product.sys.id,
    };
    try {
      // Save the review to Firebase
      setIsLoading(true);
      await addDoc(collection(db, "reviews"), reviewData);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
        variant: "default",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error submitting review",
        description: "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4 pt-32">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link
            href="/"
            className="text-[#009e7f] hover:text-[#007b65] font-normal text-base"
          >
            Home
          </Link>{" "}
          / <span className="text-gray-700 font-normal text-base">Product</span>{" "}
          / <span className="text-gray-700 font-normal text-base">
            {product.fields.title}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row gap-14 bg-[#f6f4f2] rounded-xl py-12">
          {/* Product Img Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="flex flex-col items-center">
              <img
                src={product.fields.productImage.fields.file.url}
                alt={product.fields.title}
                className="w-fit h-64 rounded-lg"
              />
              <div className="flex space-x-2 mt-4">
                <img
                  src={product.fields.productImage.fields.file.url}
                  alt="Thumbnail"
                  className="w-fit h-12 object-cover border border-gray-200 rounded"
                />
                <img
                  src={product.fields.productImage.fields.file.url}
                  alt="Thumbnail"
                  className="w-fit h-12 object-cover border border-gray-200 rounded"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold mb-4">{product.fields.title}</h1>
            <p className="text-xl text-[#22C55E] font-semibold mb-4">
              ₦{product.fields.price}.00
            </p>

            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Color:</span>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full border-2 border-blue-500 bg-black"></button>
                  <button className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white"></button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Size:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    6 x 8 inch
                  </button>
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    7 x 9 inch
                  </button>
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    8 x 11 inch
                  </button>
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    9 x 12 inch
                  </button>
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    10 x 15 inch
                  </button>
                  <button className="py-2 px-4 border rounded-lg hover:bg-gray-200">
                    12 x 16 inch
                  </button>
                </div>
              </div>
            </div>

            <CustomButton
              onClick={handleAddToCart}
              className="bg-[#22C55E] flex items-contain gap-4 w-1/2 h-12 text-white py-4 px-8 shadow-lg hover:bg-[#22C55E]/50 rounded-3xl"
              disabled={isLoading}
              isLoading={isLoading}
            >
              <Plus size={20} />
              Add to Cart
            </CustomButton>
          </div>
        </div>

        {/* Product image slider */}
        <div ref={sliderRef} className="keen-slider my-8 gap-4">
          <div className="keen-slider__slide number-slide1 w-fit bg-[#f6f4f2] py-8 rounded-md">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-fit h-32 object-cover mx-auto" // Adjust the width and height here
            />
          </div>
          <div className="keen-slider__slide number-slide2 w-fit bg-[#f6f4f2] py-8 rounded-md">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-fit h-32 object-cover mx-auto"
            />
          </div>
          <div className="keen-slider__slide number-slide3 w-fit bg-[#f6f4f2] py-8 rounded-md">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-fit h-32 object-cover mx-auto"
            />
          </div>
          <div className="keen-slider__slide number-slide4 w-fit bg-[#f6f4f2] py-8 rounded-md">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-fit h-32 object-cover mx-auto"
            />
          </div>
          <div className="keen-slider__slide number-slide5 w-fit bg-[#f6f4f2] py-8 rounded-md">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-fit h-32 object-cover mx-auto"
            />
          </div>
        </div>

        <Tabs defaultValue="reviews" className="w-full mt-8">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="additionalInfo">
              Additional Information
            </TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-lg text-gray-400">
            {product.fields.description.content[0]?.content[0]?.value}
          </TabsContent>
          <TabsContent value="additionalInfo">
            <h2 className="capitalize font-bold text-3xl">
              Additional information
            </h2>
          </TabsContent>
          <TabsContent value="reviews" className="flex flex-col gap-8 w-full md:w-1/2">
            <h2 className="font-bold text-3xl">Reviews</h2>
            <div>
              <p className="text-xl text-gray-400">There are no reviews yet</p>
              <p className="text-xl text-gray-400 mt-2">
                {`Be the first to review ${product.fields.title}.
            Your email address will not be published.`}{" "}
                <span className="text-red-500 font-medium">
                  Required fields are marked *
                </span>

              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex items-center mb-4">
                  {/* Star Rating */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormRender
                      placeholder="What do you think about this product?"
                      field={field}
                      label="Review"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormRender
                      placeholder="Jane Doe"
                      field={field}
                      label="Name *"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormRender
                      placeholder="example@gmail.com"
                      field={field}
                      label="Email *"
                      classNameLabel="dark:text-[#646464]"
                    />
                  )}
                />
                <CustomButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="mt-4"
                >
                  Submit Review
                </CustomButton>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getEntries("product");
  const paths = products.map((product: any) => ({
    params: { id: product.sys.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const products = await getEntries("product");
  const product = products.find((product: any) => product.sys.id === id);

  return { props: { product } };
};

export default ProductPage;
