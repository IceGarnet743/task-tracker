import { Menu, MoreHorizontalIcon, PlusSignIcon, Tick02Icon, X } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import TaskList from './components/TaskList'

const App = () => {
    const [selectedProject, setSelectedProject] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setIsDrawerOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative">
            <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-300 sticky top-0 z-40">
                <button onClick={toggleDrawer} className="p-1">
                    <HugeiconsIcon icon={Menu} size={24} />
                </button>
                <p className="ml-3 font-medium">Task Manager</p>
            </div>
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#f9f9f9] p-4 border-r border-gray-300 transition-transform duration-300 ease-in-out
                ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
                relative md:translate-x-0 md:static md:w-64 lg:w-60 xl:w-70
            `}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="size-5 rounded text-white text-sm bg-gray-900 flex items-center justify-center">T</div>
                        <p className="font-medium">Task Manager</p>
                    </div>
                    <button onClick={toggleDrawer} className="md:hidden">
                        <HugeiconsIcon icon={X} size={20} />
                    </button>
                </div>
                <ProjectList changeSelectedProject={project => setSelectedProject(project)} selectedProject={selectedProject}/>
                
            </div>
            {isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 md:hidden" 
                    onClick={toggleDrawer}
                />
            )}
            <div className="grow p-5 lg:p-10 xl:p-30">
                <TaskList selectedProject={selectedProject}/>
            </div>
        </div>
    )
}

const Projects = () => {

    const [selectedProject, setSelectedProject] = useState(null)

    return <>
        <ProjectList changeSelectedProject={project => setSelectedProject(project)}/>
    </>
}

export default App