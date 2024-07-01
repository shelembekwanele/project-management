import { IoMdClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "@inertiajs/react";


export default function Team ({id,name,teamMembers,onDelete=(id)=>id}){
    return <div className="flex justify-between p-5 rounded-md border shadow-sm">
        <div>
            <p className="font-semibold underline cursor-pointer">{name}</p>  
            <small>Team members : {teamMembers}</small>
        </div>
        
        <div className="flex gap-4">
            <Link href={`/team/${id}`}><FaRegEdit className="text-2xl p-1 border rounded-md cursor-pointer"/></Link>
            <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" onClick={()=>onDelete(id)}/> 
        </div>
        
    </div>
}