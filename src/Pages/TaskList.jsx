import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { getTaskList } from '../Services/Api/Api';
import Loading from '../Components/Loading';

function TaskList() {
  const [tableData, setTableData] = useState([])
  const userId = localStorage.getItem('USER_ID');
  const [loading, setLoading] = useState(false)

  const tableHeaders = [
    { key: 'taskName', label: 'Task Name' },
    { key: 'projectName', label: 'Project Name' },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority' },
    { key: 'status', label: 'Status' },
    { key: 'completionDate', label: 'Completion Date' },
    { key: 'action', label: 'Action' },
  ];

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getTaskList(userId);
        setTableData(response.data);

        if (response.status === 200) {
          setLoading(false);
        } else {
          setLoading(false);
        }

      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData()

  }, [])

  return (
    <>
      {tableData && !loading ? (
        <Table tblData={tableData} tableHeaders={tableHeaders} />
      ) : (
        <Loading />
      )}
    </>

  )
}

export default TaskList