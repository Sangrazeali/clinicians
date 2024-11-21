import Product from './Product'
import Modal from '../../../components/global-components/Modal'
import AgreementForm from './AgreementForm'
import { formatNumber } from '../../../utils/numberFormatter'
import { useAppContext } from '../../../context-api'
import {Spinner} from "@nextui-org/spinner";
function ProductMigration({loadingStates}:any) {
    const { state } = useAppContext();
    const products = state?.dashboard_data?.products;
    const user = state?.dashboard_data;
    const formattedNumber = formatNumber(user?.totalReceived);
    return (
        <div>
            <div className='border rounded-xl bg-white'>
                <div className='w-full'>
                    <div className='border-b p-7 rounded-t-xl bg-[#F5F5F5]'>
                        <p className='text-black'>
                            What you will recieve
                            <span className='text-xl ml-3 font-semibold bg-white border border-[#C6C6C6] py-1 px-3 rounded-lg text-center'>${formattedNumber !=="NaN" ? formattedNumber : "0"}</span>
                        </p>
                    </div>

                    <div className='p-7'>
                        <ul className='h-[350px] overflow-y-scroll scrollbar-hide'>
                            {loadingStates.productLoading === true ?<div className='flex justify-center items-center h-full'> <Spinner color='warning' /> </div>:
                                products != null && products?.map((product: any, index: any) => (
                                    <li key={index} className='border-b pb-2'>
                                        <Product name={product?.name} image={product?.imageUrl} price={product?.amount} />
                                    </li>
                                ))
                            }
                        </ul>
                        <div className='flex justify-end pt-7'>
                            {user?.applicationStatus === "pending" ?
                            (<Modal children="Migrate" btncolor='primary' size='5xl' scrollBehavior='inside' className='scrollbar-hide' bodyContent={<>
                                <AgreementForm />
                            </>} />)  
                            :
                            (<p className='py-2 px-4 w-[200px] text-center text-purple-800 bg-purple-100 rounded-md capitalize'>
                                {user?.applicationStatus}
                            </p>) 
                        }
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductMigration
