import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({auth,users,team}) {

    const {data,setData,errors,put}=useForm({
        name:team.name,teamMembers:team.users.map(m=>m.id)
    })

    function handleSubmit(event){
        event.preventDefault();

        put(`${team.id}`)
    }

    function handleChange(event){
        const {name,value}=event.target;
        
        setData({...data,[name]:value});
    }

    return (
        <AuthenticatedLayout 
        user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update {team.name}</h2>}>
                <Head title="Update Teams" />
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex items-end justify-center p-10">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full md:w-1/2'>
                        <div>
                            <InputLabel>Team Name</InputLabel>
                            <TextInput name='name' value={data.name} onChange={handleChange} className="w-full"
                            placeholder="name"/> 
                            <InputError message={errors.name}/>
                        </div>
                        
                        <div>
                            {<InputLabel>Team Members - {data.teamMembers.length}</InputLabel>}
                            <div className='flex flex-col gap-5 border rounded-lg p-5 max-h-80 overflow-y-auto'>
                                {users && users.map(user=>(
                                    <div key={user.id} className='flex gap-2'>

                                        <Checkbox checked={data.teamMembers.find(m=>m===user.id)||false} onChange={(event)=>{
                                            if(event.target.checked){
                                                setData({...data,teamMembers:
                                                    [...data.teamMembers,user.id]
                                                })
                                            }else{
                                                setData({...data,teamMembers:
                                                    [...data.teamMembers.filter(t=>t!=user.id)]
                                                })
                                            }
                                        }}/>
                                        <p>{user.name}</p>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>

                        <PrimaryButton type="submit" className='justify-center'>Update Team</PrimaryButton>
                    </form>
                </div>
            </div>
            
        </div>
        </AuthenticatedLayout>
    );
}
