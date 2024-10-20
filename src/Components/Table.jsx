import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ tblData, tableHeaders, hideAction }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(tblData);
  const [selectedPriority, setSelectedPriority] = useState('All');


  useEffect(() => {
    if (Array.isArray(tblData)) {
      setFilteredData(tblData);
    } else {
      setFilteredData([]);
    }
  }, [tblData]);

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Filter data based on the search term
    if (Array.isArray(tblData)) {
      const results = tblData.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(results);
    } else {
      console.error('tblData is not an array:', tblData);
    }
  };


  useEffect(() => {
    // When searchTerm changes, filter data
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleEditTask = (id) => {
    navigate(`/home/editTask/${id}`);
  }

  const taskPriority = [
    { label: 'All', value: 'All' },
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  console.log(tblData);
  
  const sortByProprity=(e)=>{
    setSelectedPriority(e)

    if(e==='All'){
      setFilteredData(tblData);
    }else{
      const filteredData = tblData?.filter(item => item.priority === e);
      setFilteredData(filteredData);
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 border-sm mt-2">
      <div className="pb-4 bg-white">

        <div className="flex gap-4 mt-4">
          <div className="relative w-2/5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="w-full pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-1/6">
            <select
              name="taskCategory"
              value={selectedPriority}
              onChange={(e) => sortByProprity(e.target.value)}
              className="w-full pt-2 pb-2 ps-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-dark-500 focus:border-dark-500"
            >
              {taskPriority.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>


      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {tableHeaders?.map((item) => (
              <th key={item.key} scope="col" className="px-6 py-3">{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData?.length > 0 ? (
            filteredData?.map(item => (
              <tr key={item._id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.taskName || item.task}</td>
                <td className="px-6 py-4">{item.projectName || item.project}</td>
                <td className="px-6 py-4">{item.taskCategory || item.category}</td>
                <td style={{
                  color: item.priority  === "Low"
                    ? 'green'
                    : item.priority  === "Medium"
                      ? 'orange'
                      : 'red'
                }} className="px-6 py-4">{item.priority}</td>
                <td className="px-6 py-4">{item.taskStatus || item.status}</td>
                <td className="px-6 py-4"> {new Date(item.completionDate || item.date).toLocaleDateString()}</td>
                {!hideAction ? (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditTask(item._id)}
                      style={{ color: "blue" }} className='hover:underline hover:text-blue-400'>
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                  </td>
                ) : (
                  <td className="px-6 py-4">{item.assignee.join(', ')}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
