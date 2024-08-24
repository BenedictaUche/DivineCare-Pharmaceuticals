import { useState } from 'react';
import { signIn } from '../../../context/auth/auth';
import { useRouter } from 'next/router';
import { Loader2Icon, CircleCheck } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

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
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 shadow-lg rounded-lg">

        {/* Left side */}
        <div className="flex flex-col items-center justify-center space-y-6 p-4">
          <img
            className="w-3/4 h-auto"
            src="/images/authImg.png"
            alt="Sign In Illustration"
          />
          <ul className="text-gray-700 space-y-4">
            <li className="flex items-center">
              <CircleCheck fill='#22c55e' className='text-white'/>
              Checkout Faster with Stored Addresses
            </li>
            <li className="flex items-center">
              <CircleCheck fill='#22c55e' className='text-white'/>
              Track Orders & View Purchase History
            </li>
            <li className="flex items-center">
              <CircleCheck fill='#22c55e' className='text-white'/>
              Safe Transactions
            </li>
            <li className="flex items-center">
              <CircleCheck fill='#22c55e' className='text-white'/>
              Earn Membership Rewards
            </li>
          </ul>
        </div>

        {/* Right side  */}
        <div className="w-full">
          <div>
            <img className="mx-auto h-12 w-auto" src="/images/logo.svg" alt="Your Pharmacy Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
          </div>
          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
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
                  placeholder="Username or Email Address"
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
                  Remember Me
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
                {isLoading ? (
                  <Loader2Icon className="w-5 h-5 text-white animate-spin" />
                ) : (
                  'Log In'
                )}
              </CustomButton>
              <p>Don{"'"}t have an account? <span className='text-blue-500 underline'><Link href='/auth/signup'>Create an account</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
