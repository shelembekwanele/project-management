import { IoMdClose } from "react-icons/io";


export default function Project ({id,name,endDate,onDelete}){
    return <div className="flex justify-between p-5 rounded-md border shadow-sm">
        <div>
            <p>{name}</p>  
            <small>{endDate}</small>
        </div>
        
        
        <IoMdClose className="text-2xl p-1 border rounded-md text-gray-500 cursor-pointer" onClick={()=>onDelete(id)}/>
    </div>
}