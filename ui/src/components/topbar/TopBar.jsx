import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/userSlice";
export default function TopBar() {
  const user = useSelector((state) => state.user.author);
  const dispatch = useDispatch()
  console.log(user)
  // const {user,dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  // console.log(PF+user.profilePic)

  const handleLogout = (e) => {
    e.preventDefault();
  
    // Clear the cookie by setting its expiration date in the past
    
  
    // Dispatch your logout action or perform any other necessary tasks
    dispatch(LOGOUT());
  };
  
  
  return (
    
    <div className="top">
      <div className="topLeft">
      <i className="topIcon fa-brands fa-facebook"></i>
      <i className="topIcon fa-brands fa-square-twitter"></i>
      <i className="topIcon fa-brands fa-square-pinterest"></i>
      <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        
        <ul className="topList">
            <li className="topListItem">
              <Link className="link" to='/' >HOME</Link>
            </li>
            <li className="topListItem">
            <Link className="link" to='/' >ABOUT</Link>
            </li>
            <li className="topListItem">
            <Link className="link" to='/' >CONTACT</Link>
            </li>
            <li className="topListItem">
            <Link className="link" to='/write' >WRITE</Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
            </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (<Link to="/settings"><span>{user.username}</span> < img src={PF + user.ProfilePic} alt="" className="topImg" /></Link>) :
         (
           <ul className="topList"> 
          <li className="topListItem">

          <Link className="link" to="/login" >LOGIN</Link>
          </li>
          <li className="topListItem">

         <Link className="link" to="/register" >REGISTER</Link>
          </li>
         </ul>

         )
         }
       
        <i class="searchIcon fa-solid fa-magnifying-glass"></i>
        
      </div>
    </div>
  )
}
