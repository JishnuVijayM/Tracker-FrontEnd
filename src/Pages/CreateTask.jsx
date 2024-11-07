import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import { MultiSelect } from 'react-multi-select-component';
import { createTask, getProjectList, getUserList } from '../Services/Api/Api';
import { Success } from '../utilis/Notification/success';
import { Error } from '../utilis/Notification/error';
import { Alert } from '../utilis/Notification/alert';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [userList, setUserList] = useState([])
    const [projectList, setProjectList] = useState([])
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        taskName: '',
        projectName: '',
        taskCategory: '',
        subTask: '',
        priority: '',
        taskStatus: '',
        completionDate: null,
        assignedTo: [],
        description: '',
        startDate: new Date(),
    });

    const priority = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
    ];

    const taskStatus = [
        { label: 'Yet to Start', value: 'Yet to Start' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'On Hold', value: 'On Hold' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Testing In Progress', value: 'Testing In Progress'},
        { label: 'Testing Completed', value: 'Testing Completed' },
        { label: 'Move To Production', value: 'Move To Production' },
    ];
    const taskCategory = [
        { label: 'Application Development', value: 'Application Development' },
        { label: 'Database', value: 'Database' },
        { label: 'Infrastrecture Setup', value: 'Infrastrecture Setup' },
        { label: 'Testing', value: 'Testing' },
        { label: 'Learnig and Development', value: 'Learnig and Development' },
        { label: 'Re-test', value: 'Re-test' },

    ];

    const subTask = [
        { label: 'Development', value: 'Development' },
        { label: 'Bug Fixing', value: 'Bug Fixing' },
        { label: 'Testing', value: 'Testing' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Core Meeting', value: 'Core Meeting' },
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
        const fetchData = async () => {
            try {
                const [userResponse, projectResponse] = await Promise.all([
                    getUserList(),
                    getProjectList()
                ]);
                setUserList(userResponse);
                setProjectList(projectResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
            const response = await createTask(formData)
            console.log(response.data);

            if (response && response.status === 200) {
                Success("Task created successfully")
                navigate('/home/dashboard');
                setLoading(false)
            } else {
                setLoading(false)
                Error("Failed to create task")
            }

        } catch (error) {
            setLoading(false)
            Error("Failed to create task")
        }

    };


    return (
        <>
            <div className="flex lg:justify-start sm:justify-center items-center h-auto p-4">
                <div className="w-full md:w-1/2 lg:w-1/2 bg-white border border-gray-300 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-2">
                            
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Task Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={formData.taskName}
                                    type="text"
                                    name="taskName"
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.taskName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                    placeholder="Enter task name"

                                />
                                {errors.taskName && <p className="text-red-500 text-xs mt-1">{"Enter Task name"}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Priority<span className="text-red-500 ms-1">*</span>
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.priority ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                >
                                    <option value="" disabled>Select a Priority</option>
                                    {priority.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Project Name<span className="text-red-500 ms-1">*</span>
                                </label>
                                <select
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.projectName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                >
                                    <option value="" disabled>Select a project</option>
                                    {projectList && Array.isArray(projectList) && projectList.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.projectName && <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Task Status<span className="text-red-500 ms-1">*</span>
                                </label>
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
                                {errors.taskStatus && <p className="text-red-500 text-xs mt-1">{errors.taskStatus}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Task Category<span className="text-red-500 ms-1">*</span>
                                </label>
                                <select
                                    name="taskCategory"
                                    value={formData.taskCategory}
                                    onChange={handleChange}
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.taskCategory ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                >
                                    <option value="" disabled>Select a Category</option>
                                    {taskCategory.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.taskCategory && <p className="text-red-500 text-xs mt-1">{errors.taskCategory}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Expected Completion Date<span className="text-red-500 ms-1">*</span>
                                </label>
                                <DatePicker
                                    minDate={new Date()}
                                    selected={formData.completionDate}
                                    onChange={handleDateChange}
                                    dateFormat={"dd/MM/yyyy"}
                                    placeholderText="Select date"
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.completionDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                    wrapperClassName="w-full"
                                />
                                {errors.completionDate && <p className="text-red-500 text-xs mt-1">{errors.completionDate}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Sub Task<span className="text-red-500 ms-1">*</span>
                                </label>
                                <select
                                    name="subTask"
                                    value={formData.subTask}
                                    onChange={handleChange}
                                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.subTask ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400'}`}
                                >
                                    <option value="" disabled>Select a sub-task</option>
                                    {subTask.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.subTask && <p className="text-red-500 text-xs mt-1">{errors.subTask}</p>}
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-900">
                                    Assigned To<span className="text-red-500 ms-1">*</span>
                                </label>
                                <div className={`rounded-lg block w-full ${errors.assignedTo ? 'border border-red-500 focus:ring-red-500 focus:border-red-500' : ' focus:ring-gray-400 focus:border-gray-400'}`}>
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
                                {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>}
                            </div>

                            <div className="w-full px-2 mb-4">
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
                                        'Submit Task'
                                    )}
                                </button>
                            </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateTask;
