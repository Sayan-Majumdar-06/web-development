import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToSnippits, updateToSnippits } from '../redux/snippitsSlice';
import Snippits from './Snippits';

const ViewSnippits = () => {
    const snippitID = useParams();
    const allSnippits = useSelector((state) => (state.snippit.snippits));
    const snippit = allSnippits.filter((p) => (p._id === snippitID.id))[0];

    return (
        <div className='bg-[#213448] h-[100vh] w-full p-[2rem] sm:p-[4rem] space-y-4'>
            <div className=' w-7/8 sm:w-6/8 md:w-5/8 flex justify-center mx-auto'>
                <input className='bg-[#0f1d23] text-white p-4 rounded-lg w-full h-[2rem] sm:h-[3.5rem] text-xs sm:text-xl mx-auto' type='text' disabled value={snippit.title}/>
            </div>

            <div className=' bg-slate-600 rounded-md w-7/8 sm:w-6/8 md:w-5/8 h-[500px] flex flex-col box-border px-1 pb-1 mx-auto'>
                <div className='w-full flex justify-start items-center p-2'>
                    <div className='flex gap-2 pl-2'>
                        <div className='bg-[#ff5f57] rounded-full h-3 w-3'></div>
                        <div className='bg-[#febc2e] rounded-full h-3 w-3'></div>
                        <div className='bg-[#2dc842] rounded-full h-3 w-3'></div>
                    </div>
                </div>
                <textarea className='bg-[#0f1d23] text-white p-4 rounded-lg' disabled value={snippit.content} rows={20}>
                </textarea>
            </div>

        </div>
    )
}

export default ViewSnippits