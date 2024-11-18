import React from 'react'
import {  Miner } from '../../../images/index';
import { formatNumber } from '../../../utils/numberFormatter';

function Product() {
    const formattedNumber = formatNumber(25000);
    const lykPrice = formatNumber(350);

    return (
        <>
            <div className='flex flex-wrap space-y-3 md:space-y-0 md:flex-nowrap justify-between items-center pt-5'>
                <div className='flex items-center gap-2'>
                    <img src={Miner} alt="" />
                    <div className='space-y-1'>
                        <p className='font-semibold text-md'>Homnifi Breeze</p>
                    </div>
                </div>
                <p className='font-semibold text-md'>$ <span>{formattedNumber}</span></p>
            </div>
        </>
    )
}

export default Product
