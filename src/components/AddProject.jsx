import React, { useState } from 'react'
import cn from '../utils/cn'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import ProjectForm from './ProjectForm'

const AddProject = ({className, refreshProjects}) => {
    const [addingProject, setAddingProject] = useState(false)

    return (<>
        {
            addingProject ?
                <ProjectForm closeForm={() => setAddingProject(false)} refreshProjects={refreshProjects}/>
            : <p onClick={() => {
                setAddingProject(true)
            }} className={cn('flex text-sm gap-3 items-center cursor-pointer', className)}>
                <HugeiconsIcon className='text-sky-700' size={16} icon={PlusSignIcon}/>
                Add Project
            </p>
        }
    </>)
}

export default AddProject