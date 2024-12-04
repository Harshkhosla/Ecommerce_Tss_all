import React, { useEffect, useState } from 'react';
import Card from "./Component/Card";
import { Book, Dollar, Headset, Users } from "./Assets";
import Chart from "./Component/Chart";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { tssurl } from '../../UI/port';
import Map from './Component/Map'
import MapsLeaf from './Component/Map/Maps_leaf';
const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('today');
  const head = "Dashboard";
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
// console.log(data2);
// console.log(data1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/user/visitor-count?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [timeframe]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/oders/daily-orders-quantity?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData1(responseData?.dailyOrdersQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [timeframe]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/user/conversionrate?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData3(responseData?.conversionRate);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [timeframe]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/oders/daily-sales?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setData2(responseData?.dailySales);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [timeframe]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${tssurl}/user/chit`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const responseData = await response.json();
  //       // setData2(responseData?.dailySales);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // Handle errors as needed
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='container'>
     <div className="flex fixed z-10">
            <TopHeader className="fixed" head={head} setTimeframe={setTimeframe} timeframe={timeframe}/>
        </div>
      <div className=" ml-72 mt-32 w-[80%] relative">
        <div className="flex flex-wrap justify-between mt-5 mx-4 sm:justify-start text-white">
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={data?.totalVisitorCount}
              subtitle={"Active users"}
              icon={Dollar}
              color={"bg-[#4EA2EF]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={data3}
              subtitle={"Conversion Percentage"}
              icon={Book}
              color={"bg-[#19398B]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4  px-2 mb-4">
            <Card
              title={data2}
              subtitle={"Daily sales"}
              icon={Headset}
              color={"bg-[#E9B84A]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={data1}
              subtitle={"Daily Orders Quantity"}
              icon={Users}
              color={"bg-[#FFA843]"}
            />
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row pl-7 pr-7 mb-5 gap-5">
          <Chart
            heading="Total Active Users"
            fields={[
              {
                name: "Today's active users",
                value: 60,
              },
              {
                name: "Yesterday's active users",
                value: 25,
              },
              {
                name: "Tomorrow's active users",
                value: 10,
              },
              {
                name: "Last Month's active users",
                value: 10,
              },
            ]}
          />
          <Chart
            heading="Total Active bookings"
            fields={[
              {
                name: "Today's active bookings",
                value: 60,
              },
              {
                name: "Yesterday's active bookings",
                value: 25,
              },
              {
                name: "Tomorrow's active bookings",
                value: 10,
              },
              {
                name: "Last Month's active bookings",
                value: 10,
              },
            ]}
          />
        </div> */}
        {/* <div>
            <Map/>
        </div> */}
        <div>
            <MapsLeaf/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
