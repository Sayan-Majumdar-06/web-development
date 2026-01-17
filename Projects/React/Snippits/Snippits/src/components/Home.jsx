import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToSnippits, updateToSnippits } from '../redux/snippitsSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const snippitID = searchParams.get("snippitID");
    const allSnippits = useSelector((state) => state.snippit.snippits);

    const dispatch = useDispatch();    

    function createSnippit() {
        //creates Snippit data and sends to slice
        const Snippit = {
            title : title,
            content : value,
            _id : snippitID || Date.now().toString(36),
            createdAt : new Date().toISOString()
        }

        if(snippitID) {
            //update Snippit
            dispatch(updateToSnippits(Snippit));
        }

        else {
            //create Snippit
            dispatch(addToSnippits(Snippit));
        }

        //after creation/updation
        setTitle('');
        setValue('');
        setSearchParams('');
    }

    useEffect(() => {
        if(snippitID) {
            const snippit = allSnippits.find((p) => p._id === snippitID);
            setTitle(snippit.title);
            setValue(snippit.content);
        } else {
            setTitle('');
            setValue('');
        }
    
    }, [snippitID, allSnippits])

  return (
    <div className='bg-[#213448] h-[100vh] w-full p-[2rem] sm:p-[4rem] pt-[2rem] space-y-4'>
        <div className='flex items-center gap-8 h-[2rem] sm:h-[4rem] p-2 pl-0 mx-auto justify-center'>
            <input className='bg-[#0f1d23] text-white p-4 rounded-lg w-1/2 h-[2rem] sm:h-[3.5rem] text-xs sm:text-xl ' type='text' placeholder='enter title here...' value={title} onChange={(e) => {
                setTitle(e.target.value);
            }}/>

            <button className='bg-slate-600 text-white rounded-lg hover:bg-slate-500 p-4 text-xs sm:text-xl flex justify-center items-center h-[2rem] sm:h-[3.5rem] transition-all duration-200' onClick={createSnippit}>
                {
                    (snippitID) ? "Update Snippit" : "Create Snippit" 
                }
            </button>
        </div>

        <div className=' bg-slate-600 rounded-md w-7/8 sm:w-6/8 md:w-5/8 h-[500px] flex flex-col box-border px-1 pb-1 mx-auto'>
            <div className='w-full flex justify-start items-center p-2'>
                <div className='flex gap-2 pl-2'>
                    <div className='bg-[#ff5f57] rounded-full h-3 w-3'></div>
                    <div className='bg-[#febc2e] rounded-full h-3 w-3'></div>
                    <div className='bg-[#2dc842] rounded-full h-3 w-3'></div>
                </div>
            </div>
            <textarea className='bg-[#0f1d23] text-white p-4 rounded-lg '  placeholder="enter text here..." rows={20} value={value} onChange={(e) => {
                setValue(e.target.value);
            }}>
            
            </textarea>
        </div>

    </div>
  )
}

export default Home