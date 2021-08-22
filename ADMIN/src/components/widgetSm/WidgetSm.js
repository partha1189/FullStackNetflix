import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./widgetSm.scss";
import Skeleton, { SkeletonTheme }  from "react-loading-skeleton";
import axios from "axios";

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTU1ZWJiZjQ0ZjgyODYyZWQ2YjRjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTM0NjYwMSwiZXhwIjoxNjI5Nzc4NjAxfQ.tfaUoA-KhsdUZsOCexaZOkAL5kCO4wwAypj6Zzvvz4g",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Joined Members</span>
      <ul className="widgetSmList">
        {newUsers.length !== 0 ? (
          newUsers.map((user) => (
            <li className="widgetSmListItem">
              <img
                src={
                  user.profilePicture ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        ) : (
          <>
            <SkeletonTheme color="#ac83daab" highlightColor="#555">
              <p>
                <Skeleton count={5} height={30} />
              </p>
            </SkeletonTheme>
          </>
        )}
      </ul>
    </div>
  );
};

export default WidgetSm;
