import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Team from '@/Components/Team';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';


export default function Edit({auth,teams,ownedTeams}) {

    const [show,setShow]=useState(false);
    const [id,setId]=useState('');

    const {delete: destroy}=useForm();

    function handleDelete(id){
        console.log("deleting")
        destroy(`team/${id}`,{
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teams</h2>}>
            <Head title="Teams" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <InputLabel className='py-2'>Search for team.</InputLabel>
                            <div>
                                <TextInput/> 
                            </div>
                        </div>
                            
                        <Link href={route('team.create')}><PrimaryButton className='mb-6'>Add new Team</PrimaryButton></Link>
                    </div>

                    {ownedTeams.length>0 && <><p className='mt-5'>My Teams :</p>
                    <div  className='grid grid-cols-2 gap-3 my-10'>            
                        {ownedTeams.map(t=><Team key={t.id} {...t} teamMembers={t.users.length} onDelete={(id)=>{
                            setId(id)
                            setShow(true)
                            }}/>)}
                    </div></>}

                    {teams.length>0 && <><p>Other Teams :</p>
                    <div  className='grid grid-cols-2 gap-3 my-10'>
                        {teams.map(t=><Team key={t.id} {...t} teamMembers={t.users.length}/>)}
                    </div></>}
                
                </div>
            </div>

            <Modal show={show} onClose={()=>setShow(false)} maxWidth='lg'>
                <div className='p-5 flex flex-col w-full border'>
                    <div>
                        <p className='font-semibold'>Are you sure you want to delete Team ?</p>
                        <p>confirm to delete team</p> 
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
