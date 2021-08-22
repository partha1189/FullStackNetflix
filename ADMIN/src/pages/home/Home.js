import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.scss';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme }  from "react-loading-skeleton";

const Home = () => {
  const MONTHS = useMemo(() =>[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axiosInstance.get("users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTU1ZWJiZjQ0ZjgyODYyZWQ2YjRjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTM0NjYwMSwiZXhwIjoxNjI5Nzc4NjAxfQ.tfaUoA-KhsdUZsOCexaZOkAL5kCO4wwAypj6Zzvvz4g",
          },
        });
        const statsList = res.data.sort(function (a, b){
          return a._id - b._id;
        });
          statsList.map(item => setUserStats(prev=>[...prev, {name: MONTHS[item._id-1], "New User": item.total}]))
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  console.log(userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      { userStats.length !== 0 ? 
      (
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      ) : (
        <>
            <SkeletonTheme color="#ac83daab" highlightColor="#555">
              <p>
                <Skeleton count={2} height={150}/>
              </p>
            </SkeletonTheme>
          </>
      )
}
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home
