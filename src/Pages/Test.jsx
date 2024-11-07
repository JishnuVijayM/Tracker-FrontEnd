import { Button } from '@headlessui/react'
import React, { useState } from 'react'

function Test() {

    // const [count , setCount]=useState(0)

    const [count, setCount] = useState[
        { "name": "anu", "age": 10, "email": "a@gmail " },
        { "name": "jinu", "age": 24, "email": "b@gmail " },
        { "name": "appu ", "age": 21, "email": "c@gmail " }
    ]


    return (

        <div >
        <ol>
            {count.map((item) => (
                <li>
                    {item.name}
                    {item.age}
                    {item.email}
                </li>
            ))}

        </ol>
        </div >
    )
}

export default Test