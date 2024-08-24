import { useState } from 'react';
import { signIn } from '../../../context/auth/auth';
import { useRouter } from 'next/router';
import { Loader2Icon } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import { useToast } from '@/components/ui/use-toast';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const {toast} = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await signIn(email, password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      })
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/images/logo.svg" alt="Your Pharmacy Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </a>
          </p>
        </div>
        <form onSubmit={handleSignIn} className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#009E7F]/50 focus:border-[#009E7F]/50 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#009E7F]/50 focus:border-[#009E7F]/50 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#009E7F]/50 focus:ring-[#009E7F]/30 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#009E7F]/50 hover:text-[#009E7F]/30">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#009E7F] hover:bg-[#009E7F]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009E7F]/30"
            >
              Sign In
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
