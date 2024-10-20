import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import { MultiSelect } from 'react-multi-select-component';
import { editTask, getTask, getUserList } from '../Services/Api/Api';
import { Success } from '../utilis/Notification/success';
import { Error } from '../utilis/Notification/error';
import { Alert } from '../utilis/Notification/alert';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../utilis/decription'
import Loading from '../Components/Loading';

function CreateTask() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [userList, setUserList] = useState([])
    const urlPath = window.location.pathname;
    const [userName, _] = useState(decrypt("ENC_USERNAME"));
    const id = urlPath.split('/').pop();
    const [projectDetails, setProjectDetails] = useState({
        projectName:'',
        currentStatus:'',
    })
    const [updatedDate, setUpdatedDate] = useState()

    const [formData, setFormData] = useState({
        // taskId: '',
        // taskName: '',
        // projectName: '',
        // taskCategory: '',
        // subTask: '',
        // priority: '',
        taskStatus: '',
        completionDate: null,
        assignedTo: [],
        description: '',
        updatedDate: new Date(),
    });

    const taskStatus = [
        { label: 'Yet to Start', value: 'Yet to Start' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'On Hold', value: 'On Hold' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Testing In Progress', value: 'Testing In Progress' },
        { label: 'Testing Completed', value: 'Testing Completed' },
        { label: 'Move To Production', value: 'Move To Production' },
    ];

    const [errors, setErrors] = useState({
        taskName: '',
        projectName: '',
        taskCategory: '',
        subTask: '',
        priority: '',
        taskStatus: '',
        completionDate: '',
        assignedTo: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, completionDate: date });
    };

    const handleMultiSelectChange = (selectedOptions) => {
        setSelected(selectedOptions);
        setFormData({ ...formData, assignedTo: selectedOptions.map(option => option.value) });
    };

    useEffect(() => {
        if (!urlPath) {
            return;
        }

        const id = urlPath.split('/').pop();

        const fetchApi = async (id) => {
            setLoading(true)

            try {
                const response = await getTask(id);
                const userResponse = await getUserList();
                setUserList(userResponse);
                const taskData = response.data;

                // Find the selected options from userList
                const selectedUsers = userResponse.filter(user =>
                    taskData.assignedTo.includes(user.value)
                );

                setFormData({
                    taskId: taskData.taskId || '',
                    taskName: taskData.taskName || '',
                    // projectName: taskData.projectName || '',
                    taskCategory: taskData.taskCategory || '',
                    subTask: taskData.subTask || '',
                    priority: taskData.priority || '',
                    taskStatus: taskData.taskStatus || '',
                    completionDate: taskData.completionDate ? new Date(taskData.completionDate) : null,
                    assignedTo: taskData.assignedTo || [],
                    description: taskData.description || '',
                    startDate: taskData.startDate ? new Date(taskData.startDate) : null,
                    updatedDate: new Date()
                    // updatedDate: taskData.updatedDate ? new Date(taskData.updatedDate) : new Date(taskData.startDate),
                });
                setProjectDetails({
                    projectName:taskData.projectName || '',
                    currentStatus:taskData.taskStatus || '',
                })
                setUpdatedDate(taskData.updatedDate ? new Date(taskData.updatedDate) : new Date(taskData.startDate))
                setSelected(selectedUsers);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false)
            }
        };

        fetchApi(id);
    }, [urlPath]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (
                (Array.isArray(formData[key]) && formData[key].length === 0) ||
                (!Array.isArray(formData[key]) && !formData[key])
            ) {
                newErrors[key] = `Select your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
                hasError = true;
            }
        });

        if (formData.completionDate === null) {
            newErrors.completionDate = 'Select the expected completion date';
            hasError = true;
        }

        if (hasError) {
            Alert('Fill the required fields')
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true)
            const response = await editTask(id, formData)
            console.log(response.data);

            if (response && response.status === 200) {
                Success("Task edited successfully")
                navigate('/home/dashboard');
                setLoading(false)
            } else {
                setLoading(false)
                Error("Failed to edit task")
            }

        } catch (error) {
            setLoading(false)
            Error("Failed to edit task")
        }

    };


    return (
        <>
            {formData && !loading ? (
                <div className="flex lg:flex-row sm:flex-col  md:flex-col  lg:justify-start sm:justify-center h-auto p-4">
                    <div className="w-full md:w-3/5 lg:w-3/5 bg-white border border-gray-300 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <h2 className='mt-1 text-sm font-medium text-gray-900'>Current Status </h2>
                                </div>
                                <div className="w-full md:w-4/6 px-2 mb-4">
                                    <h2>: {projectDetails.currentStatus}</h2>
                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <h2 className='mt-2 text-sm font-medium text-gray-900'>Reassign to<span className="text-red-500 ms-1">*</span></h2>
                                </div>
                                <div className="w-full md:w-4/6 px-2 mb-4">
                                    <MultiSelect
                                        hasSelectAll={false}
                                        options={userList}
                                        value={selected}
                                        onChange={handleMultiSelectChange}
                                        className="bg-gray-50 text-gray-900 text-sm w-full focus:ring-gray-400 focus:border-gray-400"
                                        overrideStrings={{
                                            clearSelected: "",
                                        }}
                                    />
                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <h2 className='text-sm font-medium text-gray-900 mt-1'>Last modified On</h2>
                                </div>
                                <div className="w-full md:w-4/6 px-2 mb-4">
                                    <h2>
                                        {new Date(updatedDate).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long', // "short" for abbreviated month name or "2-digit" for numeric
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true, // Set to true for 12-hour format with AM/PM
                                        })}
                                    </h2>

                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <h2 className='mt-2 text-sm font-medium text-gray-900'>Change Status<span className="text-red-500 ms-1">*</span></h2>
                                </div>
                                <div className="w-full md:w-4/6 px-2 mb-4">
                                    <select
                                        name="taskStatus"
                                        value={formData.taskStatus}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.taskStatus ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                    >
                                        <option value="" disabled>Select status</option>
                                        {taskStatus.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full md:w-1/3 px-2 mb-4">
                                    <h2 className='mt-2 text-sm font-medium text-gray-900'>Completion Date<span className="text-red-500 ms-1">*</span></h2>
                                </div>
                                <div className="w-full md:w-4/6 px-2 mb-4">
                                    <DatePicker
                                        minDate={new Date()}
                                        selected={formData.completionDate}
                                        onChange={handleDateChange}
                                        dateFormat={"dd/MM/yyyy"}
                                        placeholderText="Select date"
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.completionDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                        wrapperClassName="w-full"
                                    />
                                </div>


                                <div className="w-full md:full px-2 mb-4">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                        Description<span className="text-red-500 ms-1">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                        placeholder="Write description here..."
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{"Write description here..."}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end align-center w-full">
                                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                                <path d="M4 12a8 8 0 0 1 8-8" stroke="blue" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        'Update Task'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>


                    <div className="w-1/3 h-auto ms-3 bg-white border border-gray-300 rounded-lg shadow-md p-2">
                        <div className="w-full bg-gray-200 h-8 rounded-md flex justify-center align-center text-bold font-bold pt-1">
                            Task Details
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Task ID</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {formData.taskId}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Task Name</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {formData.taskName}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Project Name</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {projectDetails.projectName}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Sub Task</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {formData.subTask}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Priority</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {formData.priority}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Assignee</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {userName}</h2>
                            </div>
                        </div>

                        <div className="w-full h-auto  flex flex-wrap mt-2">
                            <div className="w-full md:w-1/3 px-2 mb-3">
                                <h2 className='pt-1 text-sm font-medium text-gray-900'>Created Date</h2>
                            </div>
                            <div className="w-full md:w-4/6 px-2 mb-3" style={{ marginTop: "1px" }}>
                                <h2>: {new Date(formData.startDate).toLocaleDateString()}</h2>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <Loading />
            )}

        </>
    );
}

export default CreateTask;
