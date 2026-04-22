import React, { useState } from 'react'
import cn from '../utils/cn'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import TaskForm from './TaskForm'

const AddTask = ({className, selectedProject, refreshTasks}) => {
    const [addingTask, setAddingTask] = useState(false)

    return (<>
        {
            addingTask ?
                <TaskForm closeForm={() => setAddingTask(false)} selectedProject={selectedProject} refreshTasks={refreshTasks}/>
            : <p onClick={() => {
                setAddingTask(true)
            }} className={cn('flex text-sm gap-3 items-center cursor-pointer', className)}>
                <HugeiconsIcon className='text-sky-700' size={16} icon={PlusSignIcon}/>
                Add Task
            </p>
        }
    </>)
}

export default AddTask