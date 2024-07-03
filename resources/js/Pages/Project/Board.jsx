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
import { useState } from 'react';

export default function Board({ auth, project }) {
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
                            <div className="bg-blue-100 rounded-lg">
                                <p className="p-5 bg-blue-500 text-white rounded-lg text-center">TODO</p>
                                <div className="p-2 flex flex-col gap-4">
                                    <div className="bg-white p-2 rounded-lg flex justify-between">
                                        <div>
                                            <p>Task name 001</p>
                                            <small>owner: Kwanele Shelembe</small><br />
                                            <small>expected time: 16 hrs</small>
                                        </div>
                                        <div><IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" /></div>
                                    </div>
                                    {/* Add more tasks as needed */}
                                </div>
                            </div>

                            <div className="bg-purple-100 rounded-lg">
                                <p className="p-5 bg-purple-500 text-white rounded-lg text-center">IN PROGRESS</p>
                                <div className="p-2 flex flex-col gap-4">
                                    <div className="bg-white p-2 rounded-lg flex justify-between">
                                        <div>
                                            <p>Task name 001</p>
                                            <small>owner: Kwanele Shelembe</small>
                                        </div>
                                        <div><IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" /></div>
                                    </div>
                                    {/* Add more tasks as needed */}
                                </div>
                            </div>

                            <div className="bg-pink-100 rounded-lg">
                                <p className="p-5 bg-pink-500 text-white rounded-lg text-center">COMPLETED</p>
                                <div className="p-2 flex flex-col gap-4">
                                    <div className="bg-white p-2 rounded-lg flex justify-between">
                                        <div>
                                            <p>Task name 001</p>
                                            <small>owner: Kwanele Shelembe</small>
                                        </div>
                                        <div><IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" /></div>
                                    </div>
                                    {/* Add more tasks as needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isTaskModalVisible && <TaskModal show={true} onClose={handleTaskModalClose} />}
            </div>
        </AuthenticatedLayout>
    );
}
