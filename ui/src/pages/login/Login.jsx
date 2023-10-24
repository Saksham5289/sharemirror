import { Link } from "react-router-dom"
import "./login.css"
import { Context } from "../../context/Context";
import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "../../redux/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const userRef = useRef();
  const passwordRef = useRef();
  // const {user,dispatch,isFetching} = useContext(Context)
  // const isFetching = useSelector((state)=>state.user.isFetching)
const user = useSelector((state)=>state.user.author)
  const handleSubmit =async (e) =>{
    e.preventDefault();
    dispatch(LOGIN_START);
    try{
      const res = await axios.post("/auth/login",{
        username: userRef.current.value,
        password:passwordRef.current.value,
      })
      // dispatch({type: "LOGIN_SUCCESS",payload:res.data});
      dispatch(LOGIN_SUCCESS(res.data));
      
      window.location.replace("/")
    }catch(err){
      dispatch(LOGIN_FAILURE());

    }
  };

 
  // console.log(user)
  return (
    <div className="login">
        <span className="loginTitle">
            Login
        </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className="loginInput" placeholder="Enter your username" ref={userRef} />
        <label>Password</label>
        <input type="password" className="loginInput" placeholder="Enter your password" ref={passwordRef} />
        <button className="loginButton" type="submit" >
            Login
        </button>
        <button className="loginRegisterButton" type="submit">
           <Link className="link" to="/register"> Register </Link>
        </button>
      </form> 
    </div>
  )
}
