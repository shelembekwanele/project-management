import { useState } from "react";
import CommentModal from "./CommentModal";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TextInput from "./TextInput";
import { IoMdClose } from "react-icons/io";
import { useForm } from "@inertiajs/react";

export default function TaskModal({show,onClose,project,action}){

    const [showComment,setShowComment]=useState(false);

    const {post,data,setData}=useForm({
        name:"",
        description:"",
        estimatedTime:0,
        status:"todo",
    })

    function handleChange(e){
        const {name,value}=e.target;

        setData({...data,[name]: name=='estimatedTime' ? Number(value) : value});
    }

    function handleSubmit(e){
        e.preventDefault();

        post( `/task/${project.id}`);
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className='m-10'>
                <div className='flex justify-end'>
                    <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer" onClick={onClose}/>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <InputLabel>Name</InputLabel>
                        <TextInput placeholder="Enter name ..." name="name" onChange={handleChange} value={data.name}/>  
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Description</InputLabel>
                        <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={6}
                        name='description' onChange={handleChange} value={data.description} placeholder="Enter description ..."></textarea>
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Estimated time in hours</InputLabel>
                        <TextInput type="number" min={0} name="estimatedTime" onChange={handleChange} value={data.estimatedTime}/>  
                    </div>

                    <div>
                       <SecondaryButton onClick={()=>setShowComment(true)}>Comments</SecondaryButton> 
                    </div>
                    
                    <PrimaryButton className="justify-center">{action =='create' ? "Create" : 'Update'} Task</PrimaryButton>
                </form>
                
                <CommentModal show={showComment} onClose={()=>setShowComment(false)}/>
            </div>
        </Modal>
    )
}