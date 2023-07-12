import Link from 'next/link';


export default function Socials() {
  return (

    <div className='w-full flex flex-col items-stretch py-16'>
      <div className='w-full flex flex-col items-start'>
        <div className='text-4xl pt-8 w-full'>
          <div className='flex justify-evenly w-full'>
            <div className='text-left flex flex-col'>
                <span className='text-white'>Join the <span className='font-bold'>Sheen</span><span
                  className='text-gradient text-green-400 font-bold'>Sage</span></span>
              <div>
                <div>
                  <Link
                    href='/login'
                    className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-4 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                  >
                    Sign Up
                  </Link>
                </div>
                <div>
                  <Link
                    href='https://github.com/arabacibahadir'
                    className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 text-base focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-1.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                  >
                    Github
                  </Link>
                </div>
              </div>
            </div>
            <div className='text-right text-2xl text-white'>
              <p>Access a world of AI-powered recommendations</p>
              <p>Save your discoveries, curate inspiring lists</p>
              <p>Swiftly explore great movies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}