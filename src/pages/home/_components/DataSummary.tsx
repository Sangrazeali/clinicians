import React from 'react'
import { formatNumber } from '../../../utils/numberFormatter';
import { Skeleton } from '@nextui-org/react';
export interface DataSummaryProps {
  source: string,
  label: string,
  value: number,
  loadingStates: any
}
function DataSummary(props: DataSummaryProps) {
  const { source, label, value, loadingStates } = props;
  const formattedNumber = formatNumber(value);
  return (
    <div className='flex items-center gap-5'>
      <img src={source} alt="" />
      <div className='space-y-2'>
        <p className='text-gray-500 text-sm xl:text-md'>{label}</p>
        {formattedNumber === 'NaN' ? <Skeleton className="h-3 w-4/5 rounded-lg"/>:
          <p className='text-2xl md:text-2xl xl:text-4xl font-semibold'>$ {formattedNumber}</p>
        }
      </div>
    </div>
  )
}

export default DataSummary
