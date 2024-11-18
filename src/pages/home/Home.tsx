import React from 'react'
import Banner from '../../components/Banner/Banner'
import BalanceCard from './_components/BalanceCard'
import ChartData from './_components/ChartData'
import ProductMigration from './_components/ProductMigration'
import BalanceMigration from './_components/BalanceMigration'
function Home() {
  return (
    <div className='pb-12'>
      <Banner title='Overview' />
      <div className='container px-5 mx-auto mt-12 space-y-12'>
        <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-5'>
          <BalanceCard />
          <ChartData />
        </div>
        <div>
          <BalanceMigration />
        </div>
        <div>
          <ProductMigration />
        </div>
      </div>
    </div>
  )
}

export default Home
