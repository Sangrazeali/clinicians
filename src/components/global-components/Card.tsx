import React from 'react'

export interface CardProps {
    children: React.ReactNode
}
function Card({children}: CardProps) {
    return (
        <div className='p-7 flex flex-col justify-center min-h-full bg-white border border-[#E6E6E6] rounded-2xl'>
            {children}
        </div>
    )
}

export default Card
