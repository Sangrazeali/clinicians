import React from 'react'
import Card from '../../../components/global-components/Card'
import DataSummary from './DataSummary'
import { Total, Spent, BlueRectangle, YellowRectangle, BalanceCardBg } from '../../../images'
import { formatNumber } from '../../../utils/numberFormatter';
function BalanceCard() {
    
    return (
        <div className='relative'>
            <div className='relative bg-white border rounded-2xl flex flex-col p-7 lg:p-0  justify-between min-h-full'>
                <img src={BalanceCardBg} alt="" className='w-full hidden lg:block  object-cover rounded-2xl ' />
                <div className='lg:absolute top-1/2 left-0 transform lg:translate-x-10 lg:-translate-y-1/2 z-10 space-y-4 flex gap-20 justify-between items-center min-h-full'>
                    <div className='flex flex-col justify-between '>
                        <div className='border-b pb-5 flex justify-between items-end gap-5'>
                            <DataSummary source={Spent} label='Total with Value' value={10000} />
                            <div className='text-[#32ADE6] text-center text-xs xl:text-sm'>
                                <p>
                                    Spent
                                </p>
                                <div className='flex justify-between items-center gap-2'>
                                    <img src={BlueRectangle} alt="" />
                                    <p>
                                        +<span>0.10</span>%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='pt-5 flex justify-between items-end gap-5 mb-7'>
                            <DataSummary source={Total} label='Total Purchase Balance' value={2000} />
                            <div className='text-[#FFCC00] text-center text-xs xl:text-sm'>
                                <p>
                                    Deposit
                                </p>
                                <div className='flex justify-between items-center gap-2'>
                                    <img src={YellowRectangle} alt="" />
                                    <p>
                                        -<span>0.10</span>%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className='bg-transparent border w-[200px] mx-auto border-black hover:bg-black hover:text-white tranistion ease-in-out duration-250 rounded-md px-5 py-1.5 text-sm'>Migrate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard
