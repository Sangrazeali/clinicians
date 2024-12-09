import React from 'react'
import { BalanceBg } from '../../../images'
import { formatNumber } from '../../../utils/numberFormatter';
import { useAppContext } from '../../../context-api';
import { Skeleton, Spinner } from '@nextui-org/react';

function BalanceMigration() {
  const { state } = useAppContext();
  const user = state?.dashboard_data
  const formattedNumber = formatNumber(user?.balance);
  const diff = user?.totalReceived -user?.balance;
  return (
    <div className='relative w-full px-10 flex' >
      {formattedNumber === 'NaN' ? <div className='bg-white border rounded-xl p-10 space-y-8'>
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner color='warning' />
        </div>
      </div> : (

        <>

          <div className="flex gap-10 flex-col md:flex-row items-center py-20">
            <div className='relative !z-10 flex flex-col gap-4 w-auto items-center'>
              <h2 className='text-lg'>
                {
                  user?.applicationStatus === 'approved' ? 'Your Migrated Balance' : 'Your Balance To Migrate'
                }
              </h2>

              <div className='flex'>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-sky-50/50 py-1.5 px-8 rounded-lg text-center'>${formattedNumber}</h1>
              </div>
            </div>
            <div className='relative !z-10 flex flex-col gap-4 w-auto'>
              <h2 className='text-lg invisible'>
                {
                  user?.applicationStatus === 'approved' ? 'hi' : 'hi'
                }
              </h2>

              <div className='flex'>

                <span className='relative !z-10 text-4xl text-black py-1.5 px-1 rounded-lg p-4'>+</span>
              </div>
            </div>
            <div className='relative !z-10 flex flex-col gap-4 w-auto items-center'>
              <h2 className='text-lg'>
                {
                  user?.applicationStatus === 'approved' ? 'Your Migrated Balance' : 'Extra Bonus'
                }
              </h2>

              <div className='flex'>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-sky-50/50 py-1.5 px-8 rounded-lg text-center'>${formatNumber(diff)}</h1>
              </div>
            </div>

          </div>
          <img src={BalanceBg} className='absolute right-0 top-0 !z-0 w-full object-cover md:h-auto rounded-xl h-auto' alt="" />
        </>
      )}

    </div>
  )
}

export default BalanceMigration
