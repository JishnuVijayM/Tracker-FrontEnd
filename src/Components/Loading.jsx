import React from 'react'

function Loading() {
    return (
        <div className="flex justify-center items-center h-[42rem]">
            <div className="flex items-center space-x-3">
                <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    <path d="M4 12a8 8 0 0 1 8-8" stroke="blue" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="text-lg">Loading...</span>
            </div>
        </div>
    )
}

export default Loading