import { useState } from "react";
import CommentModal from "./CommentModal";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TextInput from "./TextInput";
import { IoMdClose } from "react-icons/io";

export default function TaskModal(show=false,onClose){

    console.log(onClose)

    const [showComment,setShowComment]=useState(false);

    return (
        <Modal show={show}>
            <div className='m-10'>
                <div className='flex justify-end'>
                    <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer"/>
                </div>
                <form className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <InputLabel>Name</InputLabel>
                        <TextInput placeholder="Enter name ..."/>  
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Description</InputLabel>
                        <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={6}
                        name='description' placeholder="Enter description ..."></textarea>
                    </div>
                    <div className="flex flex-col">
                        <InputLabel>Estimated time in hours</InputLabel>
                        <TextInput type="number" min={0}/>  
                    </div>

                    <div>
                       <SecondaryButton onClick={()=>setShowComment(true)}>Comments</SecondaryButton> 
                    </div>
                    
                    <PrimaryButton className="justify-center">Update Task</PrimaryButton>
                </form>
                
                <CommentModal show={showComment} onClose={"kwanele shelembe"}/>
            </div>
        </Modal>
    )
}