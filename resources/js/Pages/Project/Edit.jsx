import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({auth,project,users}) {

    const {data,setData,put,errors} = useForm(project);

    function handleSubmit(event){
        event.preventDefault();
        put(`/project/${data.id}`,{
            onSuccess:()=>{
                setPage('dashboard')
            },
            preserveScroll:true
        });
    }

    function handleChange(event){
        const {name,value}=event.target;
        
        setData({...data,[name]:value});
    }

    return (
        <AuthenticatedLayout 
        user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit {project.name}</h2>}>
                <Head title="Edit Project" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex items-end justify-center p-10">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full md:w-1/2'>
                        <div>
                            <InputLabel>Project Name</InputLabel>
                            <TextInput name='name' value={data.name} onChange={handleChange} className="w-full"
                            placeholder="name"/> 
                            <InputError message={errors.name}/>
                        </div>

                        <div>
                            <InputLabel>Description</InputLabel>
                            <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={6}
                            name='description' value={data.description||''} onChange={handleChange} placeholder='description'></textarea>
                            <InputError message={errors.description}/>
                        </div>

                        <div>
                            <InputLabel>Status</InputLabel>
                            <select name='status' onChange={handleChange} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full'>
                                <option value="todo">Todo</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <InputError message={errors.status}/>
                        </div>

                        <div>
                            <InputLabel>Start Date</InputLabel>
                            <TextInput type="date" name="startDate" value={data.startDate} onChange={handleChange}
                            className="w-full"/>
                            <InputError message={errors.startDate}/>
                        </div>

                        <div>
                            <InputLabel>End Date</InputLabel>
                            <TextInput type="date" name="endDate" value={data.endDate} onChange={handleChange}
                            className="w-full"/>
                            <InputError message={errors.endDate}/>
                        </div>
                        
                        
                        <PrimaryButton className='text-center w-full justify-center p-3' type='submit'>Update Project</PrimaryButton>
                    </form>
                </div>
            </div>
            
        </div>
        </AuthenticatedLayout>
    );
}
