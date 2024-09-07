import React, { useState } from 'react';

function Modal({ onDataReturn }) {

    const handleLogOut = () => {
        onDataReturn(false);
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER_ID');
    }

    const handleClose = () => {
        onDataReturn(false);
    };

    return (
        <>
            <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-md">
                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="p-4 md:p-5 text-center">

                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                                Are you sure you want to Sign up?
                            </h3>
                            <button
                                onClick={handleLogOut}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={handleClose}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* )}  */}
        </>
    );
}

export default Modal;
