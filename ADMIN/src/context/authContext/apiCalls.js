import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try{
    //console.log("email:", user.email);
    const res = await axiosInstance.post('auth/login', user);
    //console.log("LOGIN", res.data);
    res.data.isAdmin &&  dispatch(loginSuccess(res.data));
  }catch(err){
    //console.log(err);
    dispatch(loginFailure(err));
  }
}