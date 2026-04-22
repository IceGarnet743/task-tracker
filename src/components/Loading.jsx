import React, { useState } from 'react'

const Loading = ({className}) => {  
    return (
        <div className={cn('border-2 border-white border-t-transparent rounded-full size-4', className)}></div>
    )
}

export default Loading