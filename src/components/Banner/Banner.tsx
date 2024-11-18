import BannerCard from './BannerCard'

function Banner({title}: {title: string}) {
    return (
        <div className='bg-custom-gradient space-y-4 py-12'>
            <div className='container px-5 mx-auto space-y-8'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                <BannerCard />
            </div>
            
        </div>
    )
}

export default Banner
