import {
    Dialog,
    DialogContent,
    DialogHeader,
  } from "@/components/ui/dialog"
import Link from "next/link";

type ModalProps = {
    className?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    productData: any;
};

const QuickViewModal = ({
    open,
    setOpen,
    className,
    productData,
  }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-4 sm:rounded-md flex flex-col sm:flex-row">
            <DialogHeader>
                <div className="flex sm:flex-row sm:gap-10 flex-col">
                    <div className="sm:w-1/2 w-full bg-[#f5f5f5] py-10 px-4">
                        <img
                            src={productData.fields.productImage.fields.file.url}
                            alt={productData.fields.title}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    <div className="sm:w-1/2 w-full flex flex-col justify-center px-4">
                        <h2 className="text-xl font-semibold">{productData.fields.title}</h2>
                        <p className="text-lg text-gray-500 mt-4">₦ {productData.fields.price}</p>

                        <div className="mt-4">
                            <label htmlFor="quantity" className="block text-base font-medium text-gray-700">Quantity</label>
                            <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" className="mt-1 block shadow-sm sm:text-base w-16 h-8 border border-gray-500"/>
                        </div>
                        <button className="bg-[#009E7F] text-white px-4 py-2 rounded-sm mt-4">Add to Cart</button>
                        <Link href={`/product/${productData.sys.id}`} className="mt-2 underline text-base capitalize">
                            View more details
                        </Link>
                    </div>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default QuickViewModal;
