import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Add from './Project/Add';
import { useState } from 'react';
import Project from '@/Components/Project';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Dashboard({ auth,projects }) {

    const [page,setPage]=useState("dashboard");
    const [show,setShow]=useState(false);
    const [id,setId]=useState('');

    const {delete: destroy}=useForm();

    function handleDelete(id){
        console.log("deleting")
        destroy(`project/${id}`,{
            onError:(err)=>{
                console.log({err})
            },
            onSuccess: ()=>{
                setShow(false);
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {page=="dashboard" && <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <InputLabel className='py-2'>Search for project.</InputLabel>
                            <div>
                              <TextInput/> 
                            </div>
             
                        </div>
                        
                       <PrimaryButton className='mb-6' onClick={()=>setPage('add')}>Add new Project</PrimaryButton>
                    </div>
                    <div className='grid grid-cols-2 gap-3 my-10'>
                        {projects.map(p=><Project key={p.id} {...p} onDelete={(id)=>{
                            setId(id)
                            setShow(true)
                            console.log(id)
                            }}/>)}
                    </div>
                </div>
            </div>}

            {page=="add" && <Add setPage={setPage}/>}

            <Modal show={show} onClose={()=>setShow(false)} maxWidth='lg'>
                <div className='p-5 flex flex-col w-full border'>
                    <div>
                        <p className='font-semibold'>Are you sure you want to delete Project ?</p>
                        <p>confirm to delete project</p> 
                    </div>
                    
                    <div className='flex gap-2 m-3 justify-end'>
                        <SecondaryButton onClick={()=>setShow(false)}>Cancel</SecondaryButton>
                        <DangerButton onClick={()=>handleDelete(id)}>Confirm</DangerButton>
                    </div>
                   
                </div>
                
            </Modal>
        </AuthenticatedLayout>
    );
}
