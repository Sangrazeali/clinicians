import React from 'react'
import Card from '../../../components/global-components/Card'
import Product from './Product'
import Modal from '../../../components/global-components/Modal'
import AgreementForm from './AgreementForm'
import { formatNumber } from '../../../utils/numberFormatter'

function ProductMigration() {
    const formattedNumber = formatNumber(25000);
    return (
        <div>
            <div className='border rounded-xl bg-white'>
                <div className='w-full'>
                    <div className='border-b p-7 rounded-t-xl bg-[#F5F5F5]'>
                        <p className='text-black'>
                            What you will recieve
                            <span className='text-xl ml-3 font-semibold bg-white border border-[#C6C6C6] py-1 px-3 rounded-lg text-center'>${formattedNumber}</span>
                        </p>
                    </div>

                    <div className='p-7'>
                        <ul>
                            <li className='border-b pb-2'>
                                <Product />
                            </li>
                            <li className='border-b pb-2'>
                                <Product />
                            </li>
                        </ul>
                        <div className='flex justify-end pt-7'>
                            <Modal children="Migrate" btncolor='primary' size='5xl' scrollBehavior='inside' className='scrollbar-hide' bodyContent={<>
                                <AgreementForm />
                            </>} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductMigration
