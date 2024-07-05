import { useEffect, useState } from "react";
import CommentModal from "./CommentModal";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TextInput from "./TextInput";
import { IoMdClose } from "react-icons/io";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";

export default function TaskModal({show,onClose,project,action,task}){

    const [showComment,setShowComment]=useState(false);

    const {post,put,data,setData,errors}=useForm({
        name:"",
        description:"",
        estimatedTime:0,
        status:"todo",
    });

    useEffect(()=>{
       if(action=='update'){
            setData(task)
        }else if(action == 'create'){
            setData({
                name:"",
                description:"",
                estimatedTime:0,
                status:"todo",
            })
        }
    },[show])

    

    function handleChange(e){
        const {name,value}=e.target;

        setData({...data,[name]: name=='estimatedTime' ? Number(value) : value});
    }

    function handleSubmit(e){
        e.preventDefault();

        if(action=='create'){
            post( `/task/${project.id}`,{
                onSuccess:()=>{
                    onClose();
                }
            });
        }else if(action=='update'){
            put(`/task/${task.id}`);
        }

        
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
                        <TextInput placeholder="Enter name ..." name="name" value={data.name} onChange={handleChange}/>  
                        <InputError message={errors.name}/>
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Description</InputLabel>
                        <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={6}
                        name='description' value={data.description} onChange={handleChange} placeholder="Enter description ..."></textarea>
                        <InputError message={errors.description}/>
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Estimated time in hours</InputLabel>
                        <TextInput type="number" min={0} name="estimatedTime" onChange={handleChange} value={data.estimatedTime}/>  
                        <InputError message={errors.estimatedTime}/>
                    </div>

                    <div>
                        <InputLabel>Status</InputLabel>
                        <select name='status' value={data.status} onChange={handleChange} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full'>
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="complete">Complete</option>
                        </select>
                        <InputError message={errors.status}/>
                    </div>

                    {action == 'update' && <div>
                       <SecondaryButton onClick={()=>setShowComment(true)}>Comments</SecondaryButton> 
                    </div>}
                    
                    <PrimaryButton className="justify-center">{action =='create' ? "Create" : 'Update'} Task</PrimaryButton>
                </form>
                
                <CommentModal show={showComment} onClose={()=>setShowComment(false)}/>
            </div>
        </Modal>
    )
}