import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AddProject from './AddProject'
import cn from '../utils/cn'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete01Icon, Edit03Icon } from '@hugeicons/core-free-icons'
import ProjectForm from './ProjectForm'
import ProjectItem from './ProjectItem'

const ProjectList = ({changeSelectedProject, selectedProject}) => {

    const [projects, setProjects] = useState([])

    const fetchProjects = () => {
        axios.get('http://localhost:5000/api/projects').then(response => {
            setProjects(response.data)
        }).catch(err => {
            toast.error("Something went wrong")
        })
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
            <p className="font-medium mb-2">Projects</p>
            <ul>
                {projects.map(project => {
                    return <ProjectItem key={project._id} project={project} selectedProject={selectedProject} refreshProjects={fetchProjects} onClick={() => changeSelectedProject(project)}/>
                    
                    // <li key={project?._id} onClick={() => changeSelectedProject(project)} className={cn(
                    //     'group pl-5 flex gap-1 py-1 mb-3 text-sm rounded-lg cursor-pointer items-center justify-between',
                    //     selectedProject?._id == project._id  && "bg-gray-200" 
                    // )}>
                    //     {
                    //         isEditing ?
                    //             <ProjectForm className={'mb-0 p-0 text-sm'} projectId={project._id} defaultTitle={project.title} defaultIcon={project.icon} closeForm={() => setIsEditing(false)}/>
                    //         :
                    //         <>
                    //             <div className='flex items-center gap-1'>
                    //                 <span>{project.icon}</span>
                    //                 <span>{project.title}</span>
                    //             </div>
                    //             <div className='opacity-0 group-hover:opacity-100 flex items-center gap-2 pr-3'>
                    //                 <HugeiconsIcon icon={Edit03Icon} className='text-green-500' size={14} onClick={() => setIsEditing(true)}/>
                    //                 <HugeiconsIcon icon={Delete01Icon} className='text-red-500' size={14} onClick={() => deleteProject(project?._id)}/>
                    //             </div>
                    //         </>
                    //     }
                    // </li>
                })}
            </ul>
            <AddProject refreshProjects={fetchProjects}/>
        </>
    )
}

export default ProjectList