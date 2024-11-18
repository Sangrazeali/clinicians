import React from 'react'
import { jbLogo } from '../images/index'
import Dropdown from './global-components/Dropdown'
import Button from './global-components/Button'
import { User } from '@nextui-org/react'
function Header() {
    return (
        <div className='w-full bg-black text-white p-2'>
            <div className='flex items-center px-5 justify-between container mx-auto'>
                <img src={jbLogo} alt={''} className='w-40' />
                <div>
                    <Dropdown children={[<User
                        as="button"
                        classNames={{
                            name: "text-sm",
                        }}
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                        }}
                        className="transition-transform"
                        name="Tony Reichert"
                    />]} array={['Profile', 'Logout']} />
                </div>
            </div>
        </div>
    )
}

export default Header
