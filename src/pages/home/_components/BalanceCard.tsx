import React from 'react'
import Card from '../../../components/global-components/Card'
import DataSummary from './DataSummary'
import { Total, Spent, BlueRectangle, YellowRectangle, BalanceCardBg, Verify } from '../../../images'
import { formatNumber } from '../../../utils/numberFormatter';
import { useAppContext } from '../../../context-api';
function BalanceCard({loadingStates}:any) {
    const { state } = useAppContext();
    const user = state?.profile
    return (
        <div className='relative min-h-full'>
            <div className='relative bg-white border rounded-2xl flex flex-col p-7 lg:p-0  justify-between items-center min-h-full lg:h-full'>
                <img src={BalanceCardBg} alt="" className='w-full min-h-full hidden lg:block object-center object-cover rounded-2xl ' />
                <div className='lg:absolute order-2 lg:order-1 top-1/2 left-0 transform lg:translate-x-10 lg:-translate-y-1/2 z-10 space-y-4 flex gap-20 justify-between items-center min-h-full'>

                    
                    <div className='flex flex-col justify-between '>
                        <div className='pb-5 flex justify-between items-end gap-5'>
                            <DataSummary source={Spent} label='Total with Value' loadingStates={loadingStates} value={user?.balance} />
                        </div>
                        <div className='pt-5 flex justify-between items-end gap-5 mb-7'>
                            <DataSummary source={Total} label='Total Purchase Balance' loadingStates={loadingStates} value={user?.capital} />
                        </div>
                        <button className='bg-transparent border w-[200px] mx-auto border-black hover:bg-black hover:text-white tranistion ease-in-out duration-250 rounded-md px-5 py-1.5 text-sm'>Migrate</button>
                    </div>
                </div>
                <div className='lg:hidden order-1 lg:order-2 mb-10 lg:mb-0 lg:mt-5 flex flex-col items-center'>
                    <img src={Verify} alt="" />
                    <p className='text-center'>You are <br /> Eligible for Migration</p>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard


/* <div className='text-[#FFCC00] text-center text-xs xl:text-sm'>
                              <p>
                                  Deposit
                              </p>
                              <div className='flex justify-between items-center gap-2'>
                                  <img src={YellowRectangle} alt="" />
                                  <p>
                                      -<span>0.10</span>%
                                  </p>
                              </div>
                          </div> */