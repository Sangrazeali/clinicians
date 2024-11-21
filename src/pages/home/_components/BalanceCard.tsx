import React from 'react'
import Card from '../../../components/global-components/Card'
import DataSummary from './DataSummary'
import { Total, Spent, BlueRectangle, YellowRectangle, BalanceCardBg, Verify, MigrationAvatar } from '../../../images'
import { formatNumber } from '../../../utils/numberFormatter';
import { useAppContext } from '../../../context-api';
import Modal from '../../../components/global-components/Modal';
import AgreementForm from './AgreementForm';
function BalanceCard({ loadingStates }: any) {
    const { state } = useAppContext();
    const user = state?.dashboard_data
    return (
        <div className='relative min-h-full'>
            <div className='relative p-7 lg:p-0 bg-white border rounded-2xl flex flex-col lg:flex-row overflow-hidden justify-between items-center min-h-full lg:h-full'>
                {/* <img src={BalanceCardBg} alt="" className='w-full min-h-full hidden lg:block object-center object-cover rounded-2xl ' /> */}

                <div className='lg:pl-10 order-2 lg:order-1 space-y-4 flex gap-20 justify-between items-center min-h-full'>


                    <div className=''>
                        <div className='pb-5 flex justify-between items-end gap-5'>
                            <DataSummary source={Spent} label='Total with Value' loadingStates={loadingStates} value={user?.balance} />
                        </div>
                        <div className='pt-5 flex justify-between items-end gap-5 mb-7'>
                            <DataSummary source={Total} label='Total Purchase Balance' loadingStates={loadingStates} value={user?.capital} />
                        </div>
                        <div className='flex justify-end pt-7'>
                            {user?.applicationStatus && user?.applicationStatus !== "pending" ?
                                (
                                    <p className='w-[200px] text-center py-2 px-4 text-purple-800 bg-purple-100 rounded-md capitalize'>
                                        {user?.applicationStatus}
                                    </p>)
                                :
                                (<Modal children="Migrate" btncolor='primary' size='5xl' scrollBehavior='inside' className='scrollbar-hide' bodyContent={<>
                                    <AgreementForm />
                                </>} />)
                            }

                        </div>
                    </div>
                </div>
                <div className='lg:hidden order-1 lg:order-2 mb-10 lg:mb-0 lg:mt-5 flex items-center gap-2'>
                    <img src={Verify} className='w-7' alt="" />
                    <p className='text-center'>
                        {user?.applicationStatus === "pending" ? "You are Eligible for Migration" :
                        (user?.applicationStatus === "applied" ? "You Applied for Migration" : "Your Migration request was rejected")
                        }
                        
                        </p>
                </div>
                <div className='hidden relative -mr-[20px] order-1 lg:order-2 lg:flex flex-col justify-center items-center'>
                    <img src={MigrationAvatar} alt="" />
                    <div className="w-80 h-40 -mt-[27px] px-5 bg-white flex flex-col items-center justify-center gap-2  rounded-t-full border border-[#E6E6E6]">
                        <img src={Verify} className='w-7' alt="" />
                        <p className='text-center'> {user?.applicationStatus === "pending" ? "You are Eligible for Migration" :
                        (user?.applicationStatus === "applied" ? "You Applied for Migration" : "Your Migration request was rejected")
                        }</p>
                    </div>
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