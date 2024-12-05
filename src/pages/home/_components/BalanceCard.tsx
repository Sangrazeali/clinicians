import DataSummary from './DataSummary'
import { Total, Spent, Verify, VerifyPending, MigrationAvatar, VerifyApproved, VerifyRejected, EyeIcon } from '../../../images'
import { useAppContext } from '../../../context-api';
import Modal from '../../../components/global-components/Modal';
import AgreementForm from './AgreementForm';
import { Spinner } from '@nextui-org/react';
import Tooltip from '../../../components/global-components/Tooltip';

const statusData = {
    pending: {
        img: Verify,
        text: "You are Eligible for Migration",
        style: "text-yellow-500 bg-yellow-100",
    },
    applied: {
        img: VerifyPending,
        text: "You Applied for Migration",
        style: "text-yellow-500 bg-yellow-100",
    },
    approved: {
        img: VerifyApproved,
        text: "Your Migration is Approved",
        style: "text-green-800 bg-green-100",
    },
    rejected: {
        img: VerifyRejected,
        text: "Your Migration Request was Rejected",
        style: "text-red-800 bg-red-100",
    },
    unknown: { // Add this default entry
        img: Verify, // Use a fallback image or an appropriate one for "unknown"
        text: "Unknown Status",
        style: "text-gray-800 bg-gray-100",
    },

};

function BalanceCard({ loadingStates }: any) {
    const { state } = useAppContext();
    const user = state?.dashboard_data;
    const status = user?.applicationStatus || "unknown";
    const statusKey = status as keyof typeof statusData;
    const { img, text, style } = statusData[statusKey];
    return (
        <div className='relative min-h-full'>
            {!user ?
                (<div className='w-full h-[350px] bg-white border rounded-xl flex justify-center items-center'>
                    <Spinner color='warning' />
                </div>)
                :

                (<div className='relative p-7 lg:p-0 bg-white border rounded-2xl flex flex-col lg:flex-row overflow-hidden justify-between items-center min-h-full lg:h-full'>

                    <div className='lg:pl-10 order-2 lg:order-1 space-y-4 flex gap-20 justify-between items-center min-h-full'>


                        <div className=''>
                            <div className='pt-5 flex justify-between items-end gap-5 mb-7'>
                                <DataSummary source={Total} label='Total Capital Balance' loadingStates={loadingStates} value={user?.capital} />
                            </div>
                            <div className='pb-5 flex justify-between items-end gap-5'>
                                <DataSummary source={Spent} label='Total Residue Balance' loadingStates={loadingStates} value={
                                    user?.applicationStatus === 'approved' ? 0 : user?.balance
                                } />
                            </div>

                            <div className='flex justify-end pt-7'>
                                {(user?.products?.length ?? 0) === 0 ? '' : (
                                    !user?.applicationStatus ? null :
                                        user.applicationStatus === "pending" ? (
                                            <Modal
                                                children="Migrate"
                                                btncolor="primary"
                                                size="5xl"
                                                scrollBehavior="inside"
                                                className="scrollbar-hide"
                                                btnClasses='w-[200px] bg-transparent border border-black text-black hover:bg-black hover:text-white'
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
                                            <Modal
                                                children="Retry Migration"
                                                btncolor="primary"
                                                size="5xl"
                                                scrollBehavior="inside"
                                                className="scrollbar-hide"
                                                btnClasses='w-[200px] bg-transparent border border-black text-black hover:bg-black hover:text-white'
                                                bodyContent={<AgreementForm />}
                                            />
                                        ) : (
                                            <p className="w-[200px] text-center py-2 px-4 text-gray-800 bg-gray-100 rounded-md capitalize">
                                                Unknown Status
                                            </p>
                                        )
                                )
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
                            <img src={img} className="w-7" alt={text} />
                            <p className="text-center flex flex-col items-center gap-2">{text}
                                {user?.applicationStatus == "rejected" ?
                                    <span> <Tooltip message={user?.reason} children=
                                        {
                                            <div className='flex items-center gap-1 cursor-pointer'>
                                                <img src={EyeIcon} className='w-4' alt="" />
                                                <p className='text-xs text-gray-500'>Reason</p>
                                            </div>
                                        }
                                    /> </span> : ''
                                }
                            </p>
                        </div>
                    </div>

                </div>)}

        </div>
    )
}

export default BalanceCard