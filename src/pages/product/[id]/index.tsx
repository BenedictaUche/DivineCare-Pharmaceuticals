import { GetStaticPaths, GetStaticProps } from "next";
import { getEntries } from "@/lib/contentful";
import { addToCart } from "@/lib/cart";
import { useRouter } from "next/router";
import { Product } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, ShieldPlus, Star, Loader2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
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

type Props = {
  product: Product;
};

const ProductPage: React.FC<Props> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0); // State to hold the rating value
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
      setIsLoading(true)
      await addDoc(collection(db, "reviews"), reviewData);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
        variant: "default",
      });
      setIsLoading(false)
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
        <div className="flex flex-col md:flex-row gap-14">
          <div className="md:w-1/3">
            <img
              src={product.fields.productImage.fields.file.url}
              alt={product.fields.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* product details */}
          <div className="md:w-1/3">
            <h1 className="text-4xl font-bold mb-2">{product.fields.title}</h1>
            <p className="text-lg text-gray-700 mb-4">
              <span className="line-through text-gray-400">
              ₦{product.fields.price + 100}
              </span>
              <span className="text-green-600 font-bold ml-2">
              ₦{product.fields.price}
              </span>
            </p>
            <p className=" text-lg text-gray-600 mb-6">
              {product.fields.description.content[0]?.content[0]?.value}
            </p>

            {/* review */}
            <div className="flex items-center mb-4">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-600">(Customer Review 0)</span>
            </div>

            <div className="flex items-center gap-4">
              <CustomButton
                onClick={handleAddToCart}
                className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Add to Cart
              </CustomButton>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-center align-middle text-center w-1/4 shadow-md rounded-md p-4">
            <div className="mx-auto flex flex-col items-center">
              <Truck size={64} className="text-[#009e7f]" />
              <h3 className="text-xl font-semibold mb-4 text-[#009e7f]">
                International Shipment
              </h3>
              <p className="text-sm text-gray-600">
                Your orders are shipped seamlessly between countries.
              </p>
            </div>
            <div className="mx-auto flex flex-col items-center">
              <ShieldPlus size={64} className="text-[#009e7f]" />
              <h3 className="text-xl font-semibold mt-6 mb-4 text-[#009e7f]">
                30 Days Warranty
              </h3>
              <p className="text-sm text-gray-600">
                You have the right to return your orders within 30 days.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full mt-8">
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
          <TabsContent value="reviews" className="flex flex-col gap-8 w-1/2">
            <h2 className="font-bold text-3xl">Reviews</h2>
            <div>
            <p className="text-xl text-gray-400">There are no reviews yet</p>
            <p className="text-xl text-gray-400 mt-2">{`Be the first to review ${product.fields.title}.
            Your email address will not be published.`}  <span className="text-red-500 font-medium">Required fields are marked *</span></p>
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
