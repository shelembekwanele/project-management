import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Team from '@/Components/Team';

export default function Edit({auth,teams}) {

    return (
        <AuthenticatedLayout 
        user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teams</h2>}>
                <Head title="Teams" />
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                <div className=" flex items-end justify-end p-5">
                    <Link ><PrimaryButton>Create Team</PrimaryButton></Link>
                </div>
                <div  className='grid grid-cols-2 gap-3'>
                    {teams.map(t=><Team {...t} teamMembers={t.users.length}/>)}
                </div>
            
            </div>
            
        </div>
        </AuthenticatedLayout>
    );
}
