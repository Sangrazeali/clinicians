import React from 'react'
import { BalanceBg } from '../../../images'
import { formatNumber } from '../../../utils/numberFormatter';
import { useAppContext } from '../../../context-api';
import { Skeleton, Spinner } from '@nextui-org/react';

function BalanceMigration() {
  const { state } = useAppContext();
  const user = state?.dashboard_data
  const formattedNumber = formatNumber(user?.balance);
  return (
    <div className='relative w-full' >
      {formattedNumber === 'NaN' ? <div className='bg-white border rounded-xl p-10 space-y-8'>
        <div className='w-full h-full flex justify-center items-center'>
          <Spinner color='warning' />
        </div>
      </div> : (

        <>
          <img src={BalanceBg} className='w-full h-[150px] object-cover md:h-auto rounded-xl' alt="" />
          <div className='absolute top-1/2 left-0 transform translate-x-10 -translate-y-1/2 z-10 space-y-4'>
            <h2 className='text-lg'>Your Balance To Migrate</h2>

            <h1 className='text-2xl md:text-4xl lg:text-4xl font-semibold bg-sky-50/50 py-1.5 px-3 rounded-lg text-center'>${formattedNumber}</h1>
          </div></>
      )}

    </div>
  )
}

export default BalanceMigration
