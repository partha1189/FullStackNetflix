import {
  Add,
  PlayArrow,
  PlayCircleFilledWhite,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useEffect, useState } from "react";
import "./listitem.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get("movies/find/" + item, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json,text/html",
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTU1ZWJiZjQ0ZjgyODYyZWQ2YjRjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTM0NjYwMSwiZXhwIjoxNjI5Nzc4NjAxfQ.tfaUoA-KhsdUZsOCexaZOkAL5kCO4wwAypj6Zzvvz4g",
          },
        });
        console.log("MOVIE:", res.data);
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{pathname:"/watch", movie: movie}}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
