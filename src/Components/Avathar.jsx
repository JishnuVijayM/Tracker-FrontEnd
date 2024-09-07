import React, { useState } from 'react'
import { decrypt } from '../utilis/decription';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom';
import Modal from './modal';


function Avathar() {
    const [userName, _] = useState(decrypt("ENC_USERNAME"));
    const [openModal, setOpenModal] = useState(false);
    const [avatharName, setAvatharName] = useState(userName.slice(0, 1).toUpperCase());

    const handleChildData = (data) => {
        setOpenModal(data);
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <div className="relative inline-flex items-center  justify-center w-5 h-5 overflow-hidden bg-gray-200 rounded-full">
                            <span className="font-medium text-bold text-gray-600">{avatharName}</span>
                        </div>
                        {userName ? userName : <p>No User Found</p>}
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        <MenuItem>
                            <Link onClick={() => setOpenModal(true)} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" to={""}>Sign out</Link>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

            {openModal && (
                <Modal modal={openModal} onDataReturn={handleChildData} />
            )}

        </>
    )
}

export default Avathar