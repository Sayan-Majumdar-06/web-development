import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex gap-6 bg-[#091b2e] text-white p-4 pl-16'>
        <NavLink to='/' className={({isActive}) => isActive ? 'text-white' : 'text-slate-500'}>
            Home
        </NavLink>
        <div>
            &gt;
        </div>
        <NavLink to='/snippits' className={({isActive}) => isActive ? 'text-white' : 'text-slate-500'}>
            Snippits
        </NavLink>
    </div>
  )
}

export default Navbar