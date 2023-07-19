'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-2 focus:ring-gray-200 font-medium rounded-lg px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      onClick={signOut}
    >
      Log Out
    </button>
  );
}
