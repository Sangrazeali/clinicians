import React from 'react'
import {  Miner } from '../../../images/index';
import { formatNumber } from '../../../utils/numberFormatter';

export interface ProductProps {
    image: string;
    name: string;
    price: number;
}
function Product({ image, name, price }: ProductProps) {
    const formattedNumber = formatNumber(price);

    return (
        <>
            <div className='flex space-y-3 md:space-y-0 px-7 md:flex-nowrap justify-between items-center pt-5'>
                <div className='flex flex-col md:flex-row md:items-center gap-2'>
                    <img src={image} className='w-[120px] md:w-[150px]' alt="" />
                    <div className=''>
                        <p className='font-semibold text-md'>{name}</p>
                    </div>
                </div>
                <p className='font-semibold text-md'>$ <span>{formattedNumber}</span></p>
            </div>
        </>
    )
}

export default Product
