import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { MovieRecommendation } from '@/components/MovieRecommendation';
import { LandingMetrics } from '@/components/LandingMetrics';
import { LandingRandomMovies } from '@/components/RandomMovies';
import Socials from '@/components/Socials';
import TopNavBar from '@/components/TopNavBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default async function Landing() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      <div className='w-full flex flex-col items-center min-h-screen'>
        <TopNavBar />
        <MovieRecommendation />
        <LandingRandomMovies />
        <div className='text-4xl py-12 text-white'>
          <span>Uncover </span><span className='text-gradient text-green-400 font-bold'>Hidden Gems </span>
          <span>in the Movie Universe</span>
        </div>
        <LandingMetrics />
        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground to-transparent' />
        <Socials />
        <ScrollToTopButton />
      </div>
    </>
  );
}
