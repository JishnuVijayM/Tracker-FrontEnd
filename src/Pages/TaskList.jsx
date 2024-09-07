import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { getTaskList } from '../Services/Api/Api';
import Loading from '../Components/Loading';

function TaskList() {
  const [tableData, setTableData] = useState([])
  const userId = localStorage.getItem('USER_ID');
  const [loading, setLoading] = useState(false)

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
        <Table tblData={tableData} />
      ) : (
        <Loading />
      )}
    </>

  )
}

export default TaskList