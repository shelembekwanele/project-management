import { IoMdClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "@inertiajs/react";


export default function Project ({id,name,endDate,team,onDelete}){

    function getTimeRemaining(targetDate) {
        const currentDate = new Date();
        const endDate = new Date(targetDate);
    
        const timeDifference = endDate - currentDate;
    
        if (timeDifference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0
            };
        }
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
        return {
            days: days,
            hours: hours,
            minutes: minutes
        };
    }

    let time=getTimeRemaining(endDate);

    setTimeout(()=>{
        time=getTimeRemaining(endDate);
    },60000)

    return <div className="flex justify-between p-5 rounded-md border shadow-sm">
        <div>
            <div>
                <Link href={`/project/board/${id}`} className="font-semibold underline cursor-pointer">{name}</Link>         
            </div>

            <div>
                <small className={time.days<1 ? 'text-red-500' : ''}>Time remaining : <span><br/>{time.days} days  {time.hours} hours  {time.minutes} minutes</span> </small><br/>
                {team && <small>Team : {team.name}</small>}
            </div>
        </div>
        
        <div className="flex gap-4">
            <Link href={`/project/${id}`}><FaRegEdit className="text-2xl p-1 border rounded-md cursor-pointer"/></Link>
            <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" onClick={()=>onDelete(id)}/> 
        </div>
        
    </div>
}