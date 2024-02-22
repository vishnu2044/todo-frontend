import React from 'react';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div class="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 px-2">
    <div class="px-4 text-center">
        <h1 class="text-gray-800 font-bold text-2xl uppercase">To Do List</h1>
    </div>
    <div class="flex items-center border-b-2  border-teal-500 py-2">
    </div>
    <div className='mt-4 pb-2'>
        <Outlet/>
    </div>


</div>
  )
}

export default HomePage