import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TaskItem from './TaskItem'
import AddTask from './AddTask'
import { HugeiconsIcon } from '@hugeicons/react'
import { FilterIcon } from '@hugeicons/core-free-icons'

const TaskList = ({selectedProject}) => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState("all")

    const fetchTasks = () => {
        axios.get(`http://localhost:5000/api/tasks/${selectedProject?._id}/${filter}`).then(response => {
            setTasks(response.data)
        }).catch(err => {
            toast.error("Something went wrong")
        })
    }

    useEffect(() => {
        if(!selectedProject) return;

        fetchTasks()
    }, [selectedProject, filter])

    return (
        <>
            { selectedProject ? 
                <>
                    <p className="text-5xl mb-5">{selectedProject.icon}</p>
                    <p className="text-4xl font-medium">{selectedProject.title}</p>

                    <div className='my-8 flex items-center justify-between'>
                        <AddTask selectedProject={selectedProject} refreshTasks={fetchTasks}/>

                        <div className="text-sm flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 border border-gray-300">
                            <HugeiconsIcon icon={FilterIcon} size={16}/>
                            <select name="filterTask" value={filter} onChange={e => setFilter(e.target.value)} id="filterTask" className='focus:outline-none'>
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        {tasks.map(task => {
                            return <TaskItem key={task._id} title={task.title} date={task.createdAt} completed={"completed" === task.status} id={task._id} refreshTasks={fetchTasks}/>
                        })}
                    </div>

                </>
            : <div className='h-full w-full flex items-center justify-center'>
                <p className='text-gray-600'>Select a project.</p>
            </div>}
        </>
    )
}

export default TaskList