import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  console.log(user)
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const registered = async (dispatch,user) =>{
  dispatch(loginStart());
  try{
    const res = await userRequest.post("auth/register",user);
    dispatch(loginSuccess(res.data));
  }catch(err){dispatch(loginFailure());}
}