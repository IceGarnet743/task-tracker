import React from 'react'
import cn from '../utils/cn'
import { Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const Checkbox = ({checked, onChange = () => {}, id}) => {
    return (
        <div className='relative size-5'>
            <input 
                id={id} 
                checked={checked} 
                onChange={onChange} 
                type="checkbox" 
                className={cn(
                    'absolute inset-0 appearance-none m-0 rounded-md border transition-all cursor-pointer z-10',
                    checked ? 'bg-blue-700 border-blue-700' : 'border-gray-400 bg-white'
                )} 
            />
            <label htmlFor={id}>
                {checked && (
                    <HugeiconsIcon
                        className='absolute top-px left-px pointer-events-none text-white z-20' 
                        icon={Tick02Icon} 
                        size={18}
                    />
                )}
            </label>
        </div>
    )
}

export default Checkbox