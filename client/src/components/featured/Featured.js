import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './featured.scss';

const Featured = ({type}) => {
  const [content, setContent] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });


  useEffect(() => {
    const getRandomMovie = async () => {
      try{
      const res = await axiosInstance.get(`movies/random${type ? "?type=" + type : ""}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        'token':  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTU1ZWJiZjQ0ZjgyODYyZWQ2YjRjMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTM0NjYwMSwiZXhwIjoxNjI5Nzc4NjAxfQ.tfaUoA-KhsdUZsOCexaZOkAL5kCO4wwAypj6Zzvvz4g",
        }
      });
      console.log("HOME FEATURED:",res.data[0]);
      setContent(res.data[0]);
    } catch (err) {
      console.log(err);
    }
    }

    getRandomMovie();
  }, [type])
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option >Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
      width="100%"
            src={content.img}
            alt=""
          />
      <div className="info">
        <img src={content.imgSm} alt="" />
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured
