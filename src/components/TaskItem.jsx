import React, { useEffect, useRef, useState } from 'react'
import cn from '../utils/cn'
import { Delete01Icon, Edit03Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Checkbox from './Checkbox'
import axios from 'axios'
import toast from 'react-hot-toast'
import TaskForm from './TaskForm'

const TaskItem = ({title, date, completed, id, refreshTasks = () => {}}) => {

    const [isCompleted, setIsCompleted] = useState(completed || false)
    const [isEditing, setIsEditing] = useState(false)
    const isFirstRender = useRef(true)

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            toast.success(`Task deleted successfully`);
        } catch (err) {
            toast.error("Failed to delete task");
        } finally {
            refreshTasks()
        }
    }

    const handleCheckboxChange = async (e) => {
        const newStatus = e.target.checked;
        const statusString = newStatus ? "completed" : "pending";
        
        
        setIsCompleted(newStatus);

        try {
            await axios.post("http://localhost:5000/api/tasks/toggleStatus", {
                taskId: id,
                status: statusString
            });
            toast.success(`Task marked as ${statusString}`);
        } catch (err) {
            setIsCompleted(!newStatus);
            toast.error("Failed to update status");
        } finally {
            refreshTasks()
        }
    };

    return <>
        {
            isEditing ? <TaskForm defaultTitle={title} taskId={id} closeForm={() => setIsEditing(false)} refreshTasks={refreshTasks}/> : 
            <div className='group/parent cursor-pointer rounded-lg border border-transparent hover:border-gray-300 hover:bg-gray-100 transition-all duration-200 mb-1'>
                <div className={cn(
                    isCompleted ? 'bg-gray-100'
                    : 'bg-white group-hover/parent:scale-102 group-hover/parent:-translate-y-2 group-hover/parent:shadow-gray-400',
                    'flex gap-2 justify-between items-center cursor-pointer rounded-lg shadow shadow-transparent transition-all duration-200 border border-transparent p-1'
                )}>
                    <div>
                        <Checkbox id={id} checked={isCompleted} onChange={handleCheckboxChange}/>
                    </div>
                    <div className='grow'>
                        <p className={cn(isCompleted ? 'line-through text-gray-600' : '', 'transition-all duration-200')}>{title}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className="text-xs text-gray-500">12 April</p>
                        <Options isCompleted={isCompleted} className={'lg:opacity-0 group-hover/parent:opacity-100'} setEditing={() => setIsEditing(true)} deleteTask={handleDelete}/>
                    </div>
                </div>
            </div>
        }
    </>
}

const Options = ({isCompleted = false, className, setEditing = () => {}, deleteTask}) => {
    const [showOptions, setShowOptions] = useState(false)
    const parentRef = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if(!(parentRef.current && parentRef.current.contains(e.target))){
                setShowOptions(false)
            }
        }
        
        document.addEventListener("click", handleClick)

        return () => document.removeEventListener("click", handleClick)
    }, [])

    return <div className={cn('relative', className)} ref={parentRef}>
        <HugeiconsIcon onClick={() => setShowOptions(true)} icon={MoreHorizontalIcon} size={16} />
        {
            showOptions &&
            <div className="absolute right-0 top-4 shadow p-2 bg-white rounded">
                {
                    !isCompleted &&
                    <OptionItem onClick={setEditing}>
                        <HugeiconsIcon icon={Edit03Icon} className='text-green-500' size={14}/>
                        <span>Edit</span>
                    </OptionItem>
                }
                <OptionItem onClick={deleteTask}>
                    <HugeiconsIcon icon={Delete01Icon} className='text-red-500' size={14}/>
                    <span>Delete</span>
                </OptionItem>
            </div>
        }
    </div>
}

const OptionItem = ({children, onClick = () => {}}) => {
    return <div onClick={onClick} className='py-1 text-sm text-gray-600 hover:text-black transition-all duration-200 flex gap-2 items-center'>{children}</div>
}

export default TaskItem