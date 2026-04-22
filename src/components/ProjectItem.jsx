import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete01Icon, Edit03Icon } from '@hugeicons/core-free-icons'
import cn from '../utils/cn'
import axios from 'axios'
import toast from 'react-hot-toast'

const ProjectItem = ({project, selectedProject, refreshProjects = () => {}, onClick}) => {

    const [isEditing, setIsEditing] = useState(false)

    const deleteProject = (projectId) => {
        axios.delete(`http://localhost:5000/api/projects/${projectId}`).then(response => {
            toast.success("Project deleted successfully")
        }).catch(err => {
            toast.error("Something went wrong")
        }).finally(() => refreshProjects())
    }


    return (
        <li key={project?._id} onClick={onClick} className={cn(
            'group pl-5 flex gap-1 py-1 mb-3 text-sm rounded-lg cursor-pointer items-center justify-between',
            selectedProject?._id == project._id  && "bg-gray-200" 
        )}>
            {
                isEditing ?
                    <ProjectForm className={'mb-0 p-0 text-sm'} projectId={project._id} defaultTitle={project.title} defaultIcon={project.icon} closeForm={() => setIsEditing(false)} refreshProjects={refreshProjects}/>
                :
                <>
                    <div className='flex items-center gap-1'>
                        <span>{project.icon}</span>
                        <span>{project.title}</span>
                    </div>
                    <div className='lg:opacity-0 group-hover:opacity-100 flex items-center gap-2 pr-3'>
                        <HugeiconsIcon icon={Edit03Icon} className='text-green-500' size={14} onClick={() => setIsEditing(true)}/>
                        <HugeiconsIcon icon={Delete01Icon} className='text-red-500' size={14} onClick={() => deleteProject(project?._id)}/>
                    </div>
                </>
            }
        </li>
    )
}

export default ProjectItem