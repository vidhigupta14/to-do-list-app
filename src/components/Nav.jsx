import React from 'react'

const Nav = () => {
  return (
    <div className='navbar flex items-center h-16 pl-6 px-20px bg-teal-950 text-white gap-7'>
        <span className="logo font-bold ">To-do's</span>
        <ul className='flex gap-3 '>
            <li className='hover:font-semibold'>Home</li>
            <li className='hover:font-semibold'>Tasks</li>
        </ul>
    </div>
  )
}

export default Nav