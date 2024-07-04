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

    console.log({tasks})

    const [isTaskModalVisible, setTaskModalVisible] = useState(false);

    const handleTaskModalClose = () => setTaskModalVisible(false);
    const handleTaskModalOpen = () => setTaskModalVisible(true);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{project.name} Board</h2>}
        >
            <Head title="Project Board" />
            <div className="py-12">
                
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg pt-10">
                    <div className='flex justify-end py-5'>
                       <PrimaryButton onClick={handleTaskModalOpen}>Add Task</PrimaryButton> 
                    </div>
                    
                    <div className=" flex items-end justify-center pb-10">
                        <div className="grid grid-cols-3 gap-5 w-full h-full">
                            <Column title="TODO" color='blue' tasks={tasks.filter(t=>t.status=='todo')}/>
                            <Column title="IN PROGRESS" color='purple' tasks={tasks.filter(t=>t.status=='in_progress')}/>
                            <Column title="COMPLETE" color='pink' tasks={tasks.filter(t=>t.status=='complete')}/>
                        </div>
                    </div>
                </div>
                <TaskModal show={isTaskModalVisible} onClose={handleTaskModalClose} project={project} action={'create'}/>
            </div>
        </AuthenticatedLayout>
    );
}
