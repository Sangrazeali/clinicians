import { formatNumber } from '../../../utils/numberFormatter';

export interface ProductProps {
    image: string;
    name: string;
    price: number;
    quantity: number;
}
function Product({ image, name, price,quantity }: ProductProps) {
    const formattedNumber = formatNumber(price);

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 space-y-3 md:space-y-0 px-7 items-center pt-5'>
                <div className='flex flex-col text-center md:text-left mx-auto md:mx-0 md:flex-row md:items-center gap-2'>
                    <img src={image} className='w-[120px] md:w-[150px]' alt="" />
                    <div className=''>
                        <p className='font-semibold text-md'>{name}</p>
                    </div>
                </div>
                <p className='font-semibold text-md text-center'>{quantity} <span className='text-xs font-normal text-gray-500'>Qty</span></p>
                <p className='font-semibold text-md text-center md:text-end'><span>{formattedNumber == '0' ? 'Free' : (name == 'mLYK' ? <span>{formattedNumber} mLYK</span> : <span>$ {formattedNumber}</span>) }</span></p>
            </div>
        </>
    )
}

export default Product
