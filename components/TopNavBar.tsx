import React from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function TopNavBar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <>
      <nav className='w-full flex justify-center h-16'>
        <div className='w-full max-w-6xl flex justify-between items-center p-3 text-sm text-foreground'>
          <div>
            <Link href='/'>
              <button className='text-3xl font-bold'>
                <span className='font-black text-foreground'>Sheen</span>
                <span className='font-black text-green-400'>Sage</span>
              </button>
            </Link>
          </div>
          <div />
          <div>
            {user ? (
              <div className='flex items-center gap-4'>
                <Link
                  href='/watchlist'
                  className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                >
                  Watchlist
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Link
                href='/login'
                className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground to-transparent' />
    </>
  );
}