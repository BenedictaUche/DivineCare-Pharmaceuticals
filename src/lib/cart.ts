import { doc, setDoc, updateDoc, arrayUnion, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase';

export const addToCart = async (productId: string, quantity: number, productName: string) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not signed in. Please sign in to add items to your cart.');
    }

    const cartRef = doc(db, 'carts', user.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const existingCart = cartSnap.data();

      // Check if the product is already in the cart
      const existingItem = existingCart.items.find((item: any) => item.productId === productId);

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += quantity;
      } else {
        // Add the new item to the cart
        await updateDoc(cartRef, {
          items: arrayUnion({ productId, quantity, productName }),
        });
      }
    } else {
      // Create a new cart for the user
      await setDoc(cartRef, {
        items: [{ productId, quantity, productName }],
      });
    }
  };

export const getCartItems = async () => {
  const user = auth.currentUser;
  if (user) {
    const cartRef = collection(db, 'users', user.uid, 'carts', user.uid);
    const cartSnap = await getDocs(cartRef);

    const cartItems = cartSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))

    return cartItems;
  }
  return [];
};
