import { useState } from 'react';
import { signUp } from '../../../context/auth/auth';
import { useRouter } from 'next/router';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {toast} = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signUp(email, password);
      router.push('/');
    } catch (error) {
      setIsLoading(false)
      if (error instanceof Error) {
        toast({
          title: 'An error occurred',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'An error occurred',
          description: 'An unknown error occurred',
          variant: 'destructive',
        });
      }
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignUp}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-[#009E7F]/70 mb-6">
          Create Your Account
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-[#009E7F]/50 hover:bg-[#009E7F]/30 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {isLoading ? <Loader2Icon className="animate-spin mx-auto" /> : "Sign Up"}
          </button>

        </div>
        <div className="text-sm">
          Already have an account?
              <Link href="/auth/signin" className="font-medium text-[#009E7F]/50 hover:text-[#009E7F]/30">
                Login
              </Link>
            </div>
      </form>

      <p className="text-center text-gray-500 text-xs">
        &copy;2024 DivinecareOgba. All rights reserved.
      </p>
    </div>
  );
};

export default SignUp;
