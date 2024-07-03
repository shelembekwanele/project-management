import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import { IoMdClose } from "react-icons/io";

export default function CommentModal(show=false,onClose){

    console.log(onClose)

    return (
        <Modal show={show} onClose={onClose}>
            <div className='m-5'>
                <div className='flex justify-end'>
                    <IoMdClose className="text-2xl p-1 border rounded-md cursor-pointer"/>
                </div>
                <div className="p-2 h-64 overflow-y-scroll bg-gray-100 mt-2 flex flex-col gap-5">
                    <div className="bg-white rounded-lg p-2 w-fit flex flex-col">
                        <small>kwanele shelembe</small>
                        <p className="font-medium my-2">Comment content is this large now this very minute 😍💕🎉
                        Comment content is this large now this very minute 😍💕🎉</p> 
                        <div className="flex justify-end gap-x-10">
                            
                            <small>1 hr ago</small>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 w-fit flex flex-col">
                        <p className="font-medium my-2">Comment content is this large now this very minute 😍💕🎉
                        Comment content is this large now this very minute 😍💕🎉</p> 
                        <div className="flex justify-between gap-x-10">
                            <small>kwanele shelembe</small>
                            <small>1 hr ago</small>
                        </div>
                    </div>
                    <div className="bg-blue-500 text-white rounded-lg p-2 w-fit flex flex-col">
                        <p className="font-medium my-2">Comment content is this large now this very minute 😍💕🎉
                        Comment content is this large now this very minute 😍💕🎉</p> 
                        <div className="flex justify-between gap-x-10">
                            <small>me</small>
                            <small>35 min ago</small>
                        </div>
                    </div>
                </div>
                <form className="m-5 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <InputLabel>Leave Comment</InputLabel>
                        <textarea className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full' rows={3}
                        name='comment' placeholder='leave comment here'></textarea>
                    </div>
                    <PrimaryButton type="submit" className="justify-center">Submit Comment</PrimaryButton>
                </form>
            </div>
        </Modal>
    )
}