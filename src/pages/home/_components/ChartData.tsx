import PieChart from '../../../components/app-charts/PieChart'
import Card from '../../../components/global-components/Card'
import { useAppContext } from '../../../context-api';

function ChartData() {
    const { state } = useAppContext();
    const chartData = state?.dashboard_data
    const total = chartData?.balance + chartData?.capital;
    const balanceP = Math.ceil((chartData?.balance / total) * 100);
    const capitalP = 100 - balanceP;
    return (
        <div>
            <Card>
                <PieChart balance={balanceP} total={capitalP} />
                <div className='flex justify-between mt-5 border-t border-[#E6E6E6] pt-5 gap-2'>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#f72585] rounded-sm mr-2'></div>
                        <p className='text-xs xl:text-sm'><span>{balanceP ? balanceP : 0}</span>% Balance</p>
                    </div>

                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#480ca8] rounded-sm mr-2'></div>
                        <p className='text-xs xl:text-sm'><span>{capitalP ? capitalP : 0}</span>% Total</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ChartData
