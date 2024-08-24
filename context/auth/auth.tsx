import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';



export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};
