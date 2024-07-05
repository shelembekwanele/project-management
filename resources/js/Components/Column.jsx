import { IoMdClose } from 'react-icons/io';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Column({title,color='gray',tasks,handleClick}){

    const [show,setShow]=useState(false);
    const [id,setId]=useState('');

    function handleDelete(id){
        router.delete(`/task/${id}`,{
            onError:(err)=>{
                console.log({err})
            },
            onSuccess: ()=>{
                setShow(false);
            }
        });
    }

    return (
        <div className={`bg-${color}-100 rounded-lg`}>
            <p className={`p-5 bg-${color}-500 text-white rounded-lg text-center`}>{title}</p>
            <div className="p-2 flex flex-col gap-4 max-h-72 overflow-y-auto">
                {tasks.map(t=>(
                    <div key={t.id} className="bg-white p-2 rounded-lg flex justify-between cursor-pointer">
                        <div onClick={()=>handleClick(t)}>
                            <p>{t.name}</p>
                            <small>owner: {t.owner.name}</small><br />
                            <small>expected time: {t.estimatedTime} hrs</small> 
                        </div>
                        <div><IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" onClick={()=>{
                            setId(t.id)
                            setShow(true)
                            console.log(id)
                            }} /></div>
                    </div>
                ))}
            </div>
            <Modal show={show} onClose={()=>setShow(false)} maxWidth='lg'>
                <div className='p-5 flex flex-col w-full border'>
                    <div>
                        <p className='font-semibold'>Are you sure you want to delete Task ?</p>
                        <p>confirm to delete Task</p> 
                    </div>
                    
                    <div className='flex gap-2 m-3 justify-end'>
                        <SecondaryButton onClick={()=>setShow(false)}>Cancel</SecondaryButton>
                        <DangerButton onClick={()=>handleDelete(id)}>Confirm</DangerButton>
                    </div>
                   
                </div>
                
            </Modal>
        </div>
    )
}