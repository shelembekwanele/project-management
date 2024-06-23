import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IoIosSearch } from 'react-icons/io';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 flex items-end justify-between">
                        <div className='m-5'>
                            <InputLabel className='py-2'>Search for project.</InputLabel>
                            <div>
                              <TextInput/> 
                            </div>
                            
                        </div>
                        
                       <PrimaryButton className='mb-6'>Add new Project</PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
