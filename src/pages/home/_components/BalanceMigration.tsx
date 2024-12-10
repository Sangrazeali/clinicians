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
    <div className='relative w-full px-10 py-14 flex bg-migratedBg w-full rounded-lg bg-cover bg-center justify-center md:justify-start' >
      {formattedNumber === 'NaN' ?
      <div className='p-10 space-y-8'>
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner color='warning' />
        </div>
      </div> : (
          <div className="flex gap-4 md:gap-10 flex-col md:flex-row items-center md:items-end">
            <div className='flex flex-col gap-4 items-center'>
              <h2 className='text-lg'>
                {
                  user?.applicationStatus === 'approved' ? 'Your Migrated Balance' : 'Your Balance To Migrate' 
                }
              </h2>

              <div className='flex'>
                <h1 className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-sky-50/50 py-1.5 px-8 rounded-lg text-center'>${formattedNumber}</h1>
              </div>
            </div>
            <span className='text-4xl text-black py-1.5 px-1 rounded-lg p-4'>+</span>
            <div className='flex flex-col gap-4 items-center'>
              <h2 className='text-lg'>
              Extra Bonus
              </h2>

              <h1 className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-sky-50/50 py-1.5 px-8 rounded-lg text-center'>${formatNumber(diff)}</h1>
            </div>

          </div>
      )}

    </div>
  )
}

export default BalanceMigration
