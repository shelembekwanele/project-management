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
export default function Column({title,color='gray',tasks}){

    return (
        <div className={`bg-${color}-100 rounded-lg`}>
            <p className={`p-5 bg-${color}-500 text-white rounded-lg text-center`}>{title}</p>
            <div className="p-2 flex flex-col gap-4">
                {tasks.map(t=>(
                    <div key={t.id} className="bg-white p-2 rounded-lg flex justify-between">
                        <div>
                            <p>{t.name}</p>
                            <small>owner: {t.owner.name}</small><br />
                            <small>expected time: {t.estimatedTime} hrs</small>
                        </div>
                        <div><IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" /></div>
                    </div>
                ))}
            </div>
        </div>
    )
}