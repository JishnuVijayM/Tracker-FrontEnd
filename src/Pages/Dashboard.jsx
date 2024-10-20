import React, { useState } from 'react'
import CustomPieChart from '../Components/PieChart'
import CustomBarChart from '../Components/BarChart'
import { useEffect } from 'react'
import { getDashboard } from '../Services/Api/Api'
import Loading from '../Components/Loading'

function Dashboard() {
  const [cardData, setCardData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [totelSum, setTotelSum] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        const response = await getDashboard()

        setCardData(response?.data.cardData);
        setPieChartData(response?.data.taskByStatus);
        setBarChartData(response?.data.totalDaysTaken);
        setTotelSum(response.data.totelDaysSum);


        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(true)
      }
    }

    fetchDashboardData()

  }, [])


  return (
    <>
      {!loading ? (
        <div className='p-4 '>
          {/* Cards */}
          <div className="w-auto h-24 flex justify-between gap-2">
            {cardData.map((item) => (
              <div
                key={item.name}
                className={`flex-1 h-auto rounded-md flex flex-col justify-center items-center shadow-md ${item.from === 'red-100' ? 'bg-gradient-to-r from-red-100 to-red-200 border-red-400' :
                    item.from === 'green-100' ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-400' :
                      item.from === 'yellow-100' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400' :
                        item.from === 'purple-100' ? 'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-400' :
                          'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300'
                  }`}
              >
                <p className="font-medium">{item.name}</p>
                <h1 className="mt-2 font-bold text-2xl">{item.value}</h1>
              </div>
            ))}
          </div>




          {/* chart */}

          <div className="relative w-auto h-auto mt-4 flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2 mt-3">
              <p className=" flex-1 font-bold text-lg">No. of task by status</p>
              <p className="flex-1 font-bold text-lg">Totel time taken by project by days</p>
            </div>

            <div className="flex justify-between gap-2 mt-2">

              {pieChartData && (
                <div className="flex-1 h-96  rounded-md flex flex-col justify-center items-center border border-grey-200 shadow-md">
                  <CustomPieChart data={pieChartData} />
                </div>
              )}

              {barChartData && (
                <div className="flex-1 h-96  rounded-md flex flex-col justify-center items-center border border-grey-200 shadow-md">
                  <CustomBarChart data={barChartData} totel={totelSum} />
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        <Loading />
      )}
    </>






  )
}

export default Dashboard