import Product from './Product'
import Modal from '../../../components/global-components/Modal'
import AgreementForm from './AgreementForm'
import { formatNumber } from '../../../utils/numberFormatter'
import { useAppContext } from '../../../context-api'
import { Spinner } from "@nextui-org/spinner";
function ProductMigration({ loadingStates }: any) {
    const { state } = useAppContext();
    const products = state?.dashboard_data?.products;
    const user = state?.dashboard_data;
    const formattedNumber = formatNumber(user?.totalReceived);
    return (
        <div>
            <div className='border rounded-xl bg-white'>
                {!products ? <div className='flex justify-center items-center h-[300px]'> <Spinner color='warning' /> </div> :

                    (
                        <div className='w-full'>
                            <div className='border-b p-7 rounded-t-xl bg-[#F5F5F5]'>
                                <p className='text-black'>
                                    What you will recieve
                                    <span className='text-xl ml-3 font-semibold bg-white border border-[#C6C6C6] py-1 px-3 rounded-lg text-center'>${formattedNumber !== "NaN" ? formattedNumber : "0"}</span>
                                </p>
                            </div>

                            <div className=''>
                                <ul className='h-[350px] overflow-y-scroll small-scroll'>
                                    {loadingStates.productLoading === true ? <div className='flex justify-center items-center h-full'> <Spinner color='warning' /> </div> :
                                        products != null && products?.map((product: any, index: any) => (
                                            <li key={index} className='border-b pb-2'>
                                                <Product name={product?.name} image={product?.imageUrl} price={product?.amount} />
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className='flex justify-end p-7'>
                                    {
                                        !user?.applicationStatus ? null :
                                            user.applicationStatus === "pending" ? (
                                                <Modal
                                                    children="Migrate"
                                                    btncolor="primary"
                                                    size="5xl"
                                                    scrollBehavior="inside"
                                                    className="scrollbar-hide"
                                                    btnClasses='w-[200px] shadow-md bg-[#F8971D]'
                                                    bodyContent={<AgreementForm />}
                                                />
                                            ) : user.applicationStatus === "applied" ? (
                                                <p className="w-[200px] text-center py-2 px-4 text-yellow-500 bg-yellow-100 rounded-md capitalize">
                                                    {user.applicationStatus}
                                                </p>
                                            ) : user.applicationStatus === "approved" ? (
                                                <p className="w-[200px] text-center py-2 px-4 text-green-800 bg-green-100 rounded-md capitalize">
                                                    {user.applicationStatus}
                                                </p>
                                            ) : user.applicationStatus === "rejected" ? (
                                                <p className="w-[200px] text-center py-2 px-4 text-red-800 bg-red-100 rounded-md capitalize">
                                                    {user.applicationStatus}
                                                </p>
                                            ) : (
                                                <p className="w-[200px] text-center py-2 px-4 text-gray-800 bg-gray-100 rounded-md capitalize">
                                                    Unknown Status
                                                </p>
                                            )
                                    }

                                </div>
                            </div>
                        </div>
                    )}

            </div>

        </div>
    )
}

export default ProductMigration
