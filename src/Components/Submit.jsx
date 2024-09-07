import React from 'react'

function Submit({label,onClick}) {
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded">
            {label}
        </button>
    );
}

export default Submit