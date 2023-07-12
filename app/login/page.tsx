'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('sign-in');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    setView('check-email');
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    router.push('/');
    router.refresh();
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <Link href='/' className='absolute left-8 top-8'>
        <button
          className='flex items-center group text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
          {' '}
          Back
        </button>
      </Link>
      {view === 'check-email' ? (
        <p className='text-center text-foreground'>
          Check <span className='font-bold'>{email}</span> to continue signing up
        </p>
      ) : (
        <form
          className='flex flex-col items-center justify-center text-foreground border-2 border-gray-800 bg-gray-900 rounded-md shadow-md p-8 w-96'
          onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
        >
          <label className='text-md' htmlFor='email'>
            Email
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 bg-gray-800'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='you@example.com'
          />
          <label className='text-md' htmlFor='password'>
            Password
          </label>
          <input
            className='rounded-md px-4 py-2 bg-inherit border mb-6 bg-gray-800'
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='••••••••'
          />
          {view === 'sign-in' && (
            <>
              <button
                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mb-6'>
                Sign In
              </button>
              <p className='text-sm text-center'>
                Don't have an account?
                <button className='ml-1 underline font-bold text-l' onClick={() => setView('sign-up')}>
                  Sign Up
                </button>
              </p>
            </>
          )}
          {view === 'sign-up' && (
            <>
              <button
                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mb-6'>
                Sign Up
              </button>
              <p className='text-sm text-center'>
                Already have an account?
                <button className='ml-1 underline' onClick={() => setView('sign-in')}>
                  Sign In Now
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
