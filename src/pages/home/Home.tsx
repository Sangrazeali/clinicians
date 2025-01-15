import React, { useEffect } from 'react'
import { Help } from '../../images'
import Tabs from '../../components/global-components/Tabs'
import Select from '../../components/global-components/Select'
import Table from '../../components/global-components/Table'
import { table } from 'console'
import Checkbox from '../../components/global-components/Checkbox'
function Home() {
  const tableData = {
    tablecells: [<><Checkbox label='Client name' color="primary" /></>, "Clinican name", "Client type", "Last session", "Unsaved notes"],
    tablebodydata: [
      [<><Checkbox label="Sam Wilson" /></>, "Dr. Smith", "Individual", "Oct 31, 2023", "3213"],
      [<><Checkbox label="Sam Wilson" /></>, "Dr. Brown", "Couple", "Oct 31, 2023", "3213"],
      [<><Checkbox label="Sam Wilson" /></>, "Dr. Adams", "Family", "Oct 31, 2023", "3213"],
      [<><Checkbox label="Sam Wilson" /></>, "Dr. Adams", "Child", "Oct 31, 2023", "3213"],
      [<><Checkbox label="Sam Wilson" /></>, "Dr. Adams", "Group", "Oct 31, 2023", "3213"],
    ]
  }
  return (
    <div className='max-w-7xl mx-auto py-10'>
      <div className='flex items-center justify-end space-x-2 text-app-primary'>
        <img src={Help} alt="help" width={15} />
        <p>Help</p>
      </div>
      <div className='mb-8'>
        <h3 className='text-lg md:text-xl xl:text-2xl font-semibold mb-7'>Clients</h3>
        <Tabs items={[
          { label: 'In treatment (21)', index: 0 },
          { label: 'Deactivated (4)', index: 1 },
        ]}
        />
      </div>
      <div className='flex flex-wrap md:flex-nowrap items-center justify-between w-full md:space-x-5'>
        <div className='flex items-center justify-between w-full space-x-3'>
          <Select label='Client Name' placeholder='Select client' name='Select client' options={['Select client', 'a', 'b', 'c']} />
          <Select label='Clinician Name' placeholder='Select clinician' name='Select clinician' options={['Select clinician', 'a', 'b', 'c']} />
        </div>
        <div className='w-full h-[1px] bg-[#E0E0E0] hidden md:block'></div>
        <div className='w-[450px]'>
          <button className='border text-sm border-app-primary text-app-primary hover:bg-app-primary hover:text-white px-4 lg:px-7 py-2 rounded-sm'> + Add new client</button>
        </div>
      </div>
      <Table tableData={tableData} />
    </div>
  )
}

export default Home
