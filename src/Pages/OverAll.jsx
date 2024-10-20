import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { getTaskForOverview } from '../Services/Api/Api';
import Loading from '../Components/Loading';

function OverAll() {
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await getTaskForOverview();
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

    const tableHeaders = [
        { key: 'taskName', label: 'Task Name' },
        { key: 'projectName', label: 'Project Name' },
        { key: 'category', label: 'Category' },
        { key: 'priority', label: 'Priority' },
        { key: 'status', label: 'Status' },
        { key: 'completionDate', label: 'Completion Date' },
        { key: 'assignee', label: 'Assignee' },
    ];

    return (
        <>
            {tableData && !loading ? (
                    <Table tableHeaders={tableHeaders} tblData={tableData} hideAction={true} />
            ) : (
                <Loading />
            )}
        </>
    )
}

export default OverAll