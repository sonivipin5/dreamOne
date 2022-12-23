import React, { useEffect, useState } from 'react'
import { FaBell, FaUserAlt } from 'react-icons/fa';
import { RiWallet3Line } from 'react-icons/ri';
import { BsTrophy } from 'react-icons/bs';
import { deleteCookie, getCookie } from 'cookies-next'

import Link from 'next/link';

const Navbar = () => {
  const [token, setToken] = useState('as')

  const logoutFunc = () => {
    deleteCookie('token')  
  }

  useEffect(() => {
    // searchQuery()
    setToken(getCookie('token'))
  }, [token])
  return (
    <div>
      <header>
        <nav className='flex justify-around h-16 items-center  shadow-lg  font-bold'>
            

            <Link href={'/'}><div className="log cursor-pointer flex text-xl items-center"><BsTrophy className='inline' /> DreamOne</div></Link>
            <ul className='sm:flex space-x-5 hidden'>
            <Link href={'/'} ><li className='cursor-pointer'>Home</li></Link>
                <li>Service</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
            <div className=' flex items-center space-x-3 '>
                <FaBell className='inline'/>
                <RiWallet3Line  className='inline'/>
                
                {token !== undefined 
          ?<div className=' flex items-center space-x-3'>
            <div className="user inlice bg-gray-400 w-8 h-8 text-center rounded-full"><FaUserAlt className='inline text-white'/></div>
            <div onClick={logoutFunc}><Link  href={'/login'}>Logout</Link></div>
          </div>
          :<Link  href={'/login'}>Login</Link>}
            </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
