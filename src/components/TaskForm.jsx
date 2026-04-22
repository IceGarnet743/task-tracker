import { Cancel01Icon, Tick04Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const TaskForm = ({closeForm = () => {}, selectedProject, defaultTitle = "New Task", taskId, refreshTasks = () => {}}) => {
    const [formData, setFormData] = useState({
        title : defaultTitle,
        selectedProject : selectedProject?._id
    })
    const titleRef = useRef()

    const handleChange = (e) => {
        setFormData(prev => {
            return {...prev, [e.target.name] : e.target.value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if("" === formData.title){
            toast.title("Title is required")
            return
        }

        if(taskId){
            await updateTask()
        }else{
            await createNewTask()
        }
    }

    const updateTask = async () => {
        const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, formData).then(() => {
            toast.success("Task update successfully")
            closeForm()
            refreshTasks()
        }).catch(err => {
            toast.error("Something went wrong!")
        })
    }

    const createNewTask = async () => {
        const response = await axios.post("http://localhost:5000/api/tasks", formData).then(() => {
            toast.success("New task added")
            closeForm()
            refreshTasks()
        }).catch(err => {
            toast.error("Something went wrong!")
        })
    }

    useEffect(() => {
        if(titleRef.current){
            titleRef.current.select()
        }
    }, [])

    useEffect(() => {
        setFormData(prev => ({ ...prev, selectedProject: selectedProject?._id }))
    }, [selectedProject])

    return (
        <form onSubmit={handleSubmit} className='flex justify-between items-center gap-2 mb-4 border border-gray-200 rounded-md'>
            <div>
                <HugeiconsIcon onClick={closeForm} icon={Cancel01Icon} className='text-red-500 cursor-pointer'/>
            </div>
            <div className='grow'>
                <input ref={titleRef} name='title' value={formData.title} onChange={handleChange} type="text" placeholder='New Task' className='w-full text-sm focus:outline-none' />
            </div>
            <div>
                <button className='bg-green-500 text-white flex gap-2 px-3 py-1 rounded text-sm'>
                    <HugeiconsIcon icon={Tick04Icon} size={16}/>
                    <span>Save</span>
                </button>
            </div>
        </form>
    )
}

export default TaskForm