import { Cancel01Icon, Tick04Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import cn from '../utils/cn'

const ProjectForm = ({className, closeForm = () => {}, defaultTitle = "New Project", defaultIcon = "😎",projectId, refreshProjects = () => {}}) => {
    const [formData, setFormData] = useState({
        title : defaultTitle,
        icon : defaultIcon
    })
    const [isLoading, setIsLoading] = useState(false)
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

        setIsLoading(true)

        if(projectId){
            updateProject()
        }else{
            createNewProject()
        }
        
    }

    const updateProject = async () => {
        const response = await axios.put(`http://localhost:5000/api/projects/${projectId}`, formData).then(() => {
            toast.success("Project updated successfully")
            closeForm()
        }).catch(err => {
            toast.error("Something went wrong!")
        }).finally(() => {
            setIsLoading(false)
            refreshProjects()
        })
    }

    const createNewProject = async () => {
        const response = await axios.post("http://localhost:5000/api/projects", formData).then(() => {
            toast.success("New project added")
            closeForm()
        }).catch(err => {
            toast.error("Something went wrong!")
        }).finally(() => {
            setIsLoading(false)
            refreshProjects()
        })
    }

    useEffect(() => {
        if(titleRef.current){
            titleRef.current.select()
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className={cn('flex justify-between items-center gap-2 mb-4 p-1 border border-gray-200 rounded-md', className)}>
            <div>
                <HugeiconsIcon icon={Cancel01Icon} size={16} className='text-red-500 cursor-pointer' onClick={closeForm}/>
            </div>
            <div className='grow flex items-center'>
                <select value={formData.icon} name='icon' onChange={handleChange}>
                    <option value="🤩">🤩</option>
                    <option value="😎">😎</option>
                    <option value="😊">😊</option>
                    <option value="😁">😁</option>
                    <option value="😂">😂</option>
                    <option value="❤️">❤️</option>
                    <option value="😥">😥</option>
                </select>
                <input name='title' ref={titleRef} value={formData.title} onChange={handleChange} type="text" placeholder='Project' className='w-full text-sm focus:outline-none' />
            </div>
            <div>
                <button className='bg-green-500 text-white flex gap-2 px-2 py-1 rounded text-sm'>
                    <HugeiconsIcon icon={Tick04Icon} size={12}/>
                </button>
            </div>
        </form>
    )
}

export default ProjectForm