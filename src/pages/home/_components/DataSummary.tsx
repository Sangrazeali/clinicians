import React from 'react'
import { formatNumber } from '../../../utils/numberFormatter';
export interface DataSummaryProps {
    source: string,
    label: string,
    value: number
}
function DataSummary(props: DataSummaryProps) {
    const {source, label, value} = props;
    const formattedNumber = formatNumber(value); 
  return (
    <div className='flex items-center gap-5'>
        <img src={source} alt="" />
        <div className='space-y-2'>
            <p className='text-gray-500 text-sm xl:text-md'>{label}</p>
            <p className='text-2xl md:text-2xl xl:text-4xl font-semibold'>$ {formattedNumber}.00</p>
        </div>
    </div>
  )
}

export default DataSummary
