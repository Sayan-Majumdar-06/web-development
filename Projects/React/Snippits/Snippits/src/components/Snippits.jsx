import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromSnippits } from '../redux/snippitsSlice';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import editimg from '../assets/edit.svg'
import deleteimg from '../assets/delete.svg'
import shareimg from '../assets/share.svg'
import viewimg from '../assets/view.svg'
import copyimg from '../assets/copy.svg'


const Snippits = () => {
    const snippits = useSelector((state) => state.snippit.snippits);
    const location = useLocation();

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = snippits.filter(
        (snippit) => snippit.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handleDelete(snippitID) {
        dispatch(removeFromSnippits(snippitID)); 
    }

    function handleShare(snippitID) {
        const url = `${window.location.origin}${location.pathname}/${snippitID}`;
        navigator.clipboard.writeText(url);
        toast.success("Link Copied to clipboard");
    }

    function handleCopy(content) {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
    }

    return (
    <div className='bg-[#213448] h-[100vh] w-full p-[4rem] pt-[2rem] space-y-1 sm:space-y-4'>
        <input
        className='bg-[#0f1d23] text-white p-4 rounded-lg w-full text-xs sm:text-xl md:w-10/12 lg:w-8/12 h-[2rem] sm:h-[3.5rem]'
         type='search'
         value={searchTerm}
         placeholder='search here'
         onChange={(e) => setSearchTerm(e.target.value)}
         />

        <div className='flex flex-col gap-4 mt-4'>
            {
                (filteredData.length > 0) ? 
                    filteredData.map(
                        (snippit) => {

                            const date = new Intl.DateTimeFormat("en-US", {
                                month:"long", day:"2-digit", year:"numeric"
                            }).format(new Date(snippit.createdAt));

                            return (
                                <div className='p-3 bg-[#0f1d23] text-white max-w-[800px] flex flex-col gap-2' key={snippit._id}>
                                    <div className='text-3xl font-semibold p-2'>
                                        {snippit.title}
                                    </div>

                                    <div className='border-slate-500 border-1 p-2 h-[100px]'>
                                        {snippit.content}
                                    </div>

                                    <div className='flex flex-col gap-2 sm:flex-row justify-between p-2'>
                                        <div className='flex gap-3'>
                                            <button className='border-1 border-slate-500 hover:border-blue-500 hover:bg-[#00a6ff41] h-8 w-8 flex justify-center items-center p-1'><Link to={`/?snippitID=${snippit._id}`}>
                                            <img src={editimg} alt="edit"/>
                                            </Link></button>
                                            <button className='border-1 border-slate-500 hover:border-red-500 hover:bg-[#ff000041] h-8 w-8 flex justify-center items-center cursor-pointer p-1' onClick={() => handleDelete(snippit._id)}>
                                                <img src={deleteimg} alt="delete"/>
                                            </button>
                                            <button className='border-1 border-slate-500 hover:border-green-500 hover:bg-[#00ff3341] h-8 w-8 flex justify-center items-center cursor-pointer p-1' onClick={() => handleShare(snippit._id)}>
                                                <img src={shareimg} alt="share"/>
                                            </button>
                                            <button className='border-1 border-slate-500 hover:border-yellow-200 hover:bg-[#fbff0041] h-8 w-8 flex justify-center items-center p-1'><Link to={`/snippits/${snippit._id}`}>
                                                <img src={viewimg} alt="view"/>
                                            </Link></button>
                                            <button className='border-1 border-slate-500 hover:border-amber-500 hover:bg-[#ff510041] h-8 w-8 flex justify-center items-center cursor-pointer p-1' onClick={() => handleCopy(snippit.content)}>
                                                <img src={copyimg} alt="copy"/>
                                            </button>
                                        </div>

                                        <div>
                                            {date}                                            
                                        </div>
                                    </div>                                    
                                </div>
                            )
                        }
                    )
                : 

                <div className='h-[200px] bg-[#0f1d23] text-slate-400 md:w-10/12 lg:w-8/12 flex items-center text-xl sm:text-3xl p-8'>
                    It's really quite here...
                </div>
            }
        </div>
    </div>
    )
}

export default Snippits