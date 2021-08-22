import axios from "axios";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try{
    //console.log("email:", user.email);
    const res = await axiosInstance.get('movies', {
      headers: {token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken}
    });
    //console.log("LOGIN", res.data);
    dispatch(getMoviesSuccess(res.data));
  }catch(err){
    //console.log(err);
    dispatch(getMoviesFailure());
  }
}

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try{
    //console.log("email:", user.email);
    const res = await axiosInstance.post('movies', movie, {
      headers: {token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken}
    });
    //console.log("LOGIN", res.data);
    dispatch(createMovieSuccess(res.data));
  }catch(err){
    //console.log(err);
    dispatch(createMovieFailure());
  }
}

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try{
    //console.log("email:", user.email);
    const res = await axiosInstance.delete('movies/'+id, {
      headers: {token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken}
    });
    //console.log("LOGIN", res.data);
    dispatch(deleteMovieSuccess(id));
  }catch(err){
    //console.log(err);
    dispatch(deleteMovieFailure());
  }
}