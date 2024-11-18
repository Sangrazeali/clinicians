import PieChart from '../../../components/app-charts/PieChart'
import Card from '../../../components/global-components/Card'

function ChartData() {
    return (
        <div>
            <Card>
                <PieChart />
                <div className='flex justify-between mt-5 border-t border-[#E6E6E6] pt-5 gap-2'>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#f72585] rounded-sm mr-2'></div>
                        <p className='text-xs xl:text-sm'><span>50</span>% Balance</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#1b9fda] rounded-sm mr-2'></div>
                        <p className='text-xs xl:text-sm'><span>20</span>% Used</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#480ca8] rounded-sm mr-2'></div>
                        <p className='text-xs xl:text-sm'><span>20</span>% Credit</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ChartData
