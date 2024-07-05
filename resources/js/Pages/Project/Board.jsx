import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaTimes } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Modal from '@/Components/Modal';
import TaskModal from '@/Components/TaskModal';
import { useEffect, useState } from 'react';
import Column from '@/Components/Column';

export default function Board({ auth, project,tasks }) {

    const [isTaskModalVisible, setTaskModalVisible] = useState(false);

    const handleTaskModalClose = () => setTaskModalVisible(false);
    const handleTaskModalOpen = () => setTaskModalVisible(true);

    const [task,setTask]=useState(null);
    const [action,setAction]=useState("create");

    function handleTaskClick(task){
        setTask(task);
        setAction('update');
        handleTaskModalOpen();
    }
    function handleAddTask(){
        setAction('create');
        handleTaskModalOpen();
    }

    useEffect(()=>{
        if(task){
           const t=tasks.find(t=>t.id==task.id);
           setTask(t);
        }
        
    },[tasks]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{project.name} Board</h2>}
        >
            <Head title="Project Board" />
            <div className="py-12">
                
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg pt-5">
                    <div className='flex justify-end py-5'>
                       <PrimaryButton onClick={handleAddTask}>Add New Task</PrimaryButton> 
                    </div>
                    
                    <div className=" flex items-end justify-center pb-10">
                        <div className="grid grid-cols-3 gap-5 w-full h-full">
                            <Column title="TODO" color='blue' tasks={tasks.filter(t=>t.status=='todo')} handleClick={handleTaskClick}/>
                            <Column title="IN PROGRESS" color='purple' tasks={tasks.filter(t=>t.status=='in_progress')} handleClick={handleTaskClick}/>
                            <Column title="COMPLETE" color='pink' tasks={tasks.filter(t=>t.status=='complete')} handleClick={handleTaskClick}/>
                        </div>
                    </div>

                    <div className='hidden bg-blue-500'></div>
                    <div className='hidden bg-blue-100'></div>
                    <div className='hidden bg-purple-500'></div>
                    <div className='hidden bg-purple-100'></div>
                    <div className='hidden bg-pink-500'></div>
                    <div className='hidden bg-pink-100'></div>
                </div>
                <TaskModal show={isTaskModalVisible} onClose={handleTaskModalClose} project={project} action={action} task={task} auth={auth}/>
            </div>
        </AuthenticatedLayout>
    );
}
