import { useEffect,useRef } from "react";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import { IoIosTrash, IoMdClose, IoMdEasel, IoMdRemove, IoMdTrash } from "react-icons/io";
import { router, useForm } from "@inertiajs/react";

export default function CommentModal({show=false,onClose,task,auth}){

    const commentsEndRef = useRef(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        
        setTimeout(()=>scrollToBottom(),100); 

        localStorage.setItem('commentsLength',task.comments.length);

    }, [task.comments,show]);


    function timeAgo(createdAt) {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffInMs = now - createdDate;
        
        const minutes = Math.floor(diffInMs / 60000);
        const hours = Math.floor(diffInMs / 3600000);
        const days = Math.floor(diffInMs / 86400000);
    
        if (days > 0) {
            return days === 1 ? `${days} day ago` : `${days} days ago`;
        } else if (hours > 0) {
            return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
        } else {
            return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
        }
    }

    const {data,setData,post,delete:destroy}=useForm({
        content:''
    });

    function handleChange(e){
        const {name,value}=e.target;

        setData({...data,[name]:value});
    }

    function handleSubmit(e){
        e.preventDefault();

        post(`/taskComment/${task.id}`,{onSuccess:()=>{
            setData({content:''})
        }})
    }

    function handleDelete(id){
        destroy(`/taskComment/${id}`);
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className='m-5'>
                <div className='flex justify-end'>
                    <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" onClick={onClose}/>
                </div>
                <div className="p-2 h-64 overflow-y-scroll bg-gray-100 mt-2 flex flex-col gap-5">
                    {task.comments.map(comment=>(
                        <div key={comment.id} className={`w-full flex ${auth.user.id==comment.owner.id && "justify-end"}`}>
                            <div className={`${auth.user.id==comment.owner.id ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-2 w-fit flex flex-col`}>
                                <div className="flex justify-between">
                                   <small>{auth.user.id==comment.owner.id ? 'you' :comment.owner.name}</small>
                                   {auth.user.id==comment.owner.id ? <IoMdTrash className=" cursor-pointer" onClick={()=>handleDelete(comment.id)}/> : null}
                                </div>
                                
                                <p className="font-medium my-2">{comment.content}</p> 
                                <div className="flex justify-end gap-x-10">
                                    
                                    <small>{timeAgo(comment.created_at)}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div ref={commentsEndRef}></div>
                </div>
                <form className="m-5 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <InputLabel>Leave Comment</InputLabel>
                        <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={3}
                        name='content' value={data.content} placeholder='leave comment here' onChange={handleChange}></textarea>
                    </div>
                    <PrimaryButton type="submit" className="justify-center">Submit Comment</PrimaryButton>
                </form>
            </div>
        </Modal>
    )
}