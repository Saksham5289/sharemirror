

import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"

import { useState } from "react"
import axios from "axios"
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UPDATE } from "../../redux/userSlice";

export default function Settings() {
  const user = useSelector((state)=>state.user.author)
  const [file,setFile] = useState(null)
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();
  
  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   const updatedUser = {
  //     userId: user._id,
  //     username,email,password
      
  //   }
  //   if (file){
  //     const data =new FormData();
  //     const filename = Date.now() + file.name;
  //     data.append("name",filename)
  //     data.append("file",file)
  //     updatedUser.profilePic = filename;
  //     try{  
  //           await axios.post("/upload",data)
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   console.log(user._id)
  //   try{
    
  //    await axios.put("/users/"+user._id,updatedUser)
  //   // window.location.replace("/post/" + res.data._id)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
  
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.ProfilePic = filename;
      console.log(updatedUser);
      try {
        console.log("Uploading file...");
        await axios.post("/upload", data);
        console.log("File upload successful",updatedUser);
        console.log("File upload successful",updatedUser);
      } catch (err) {
        console.log("Error during file upload:", err);
      }
    }
  
    console.log("Updating user:", user._id);
    try {
      const response = await axios.put("/users/" + user._id, updatedUser);
      console.log("User update successful:", response.data);
      dispatch(UPDATE(response.data));
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };
  

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Your Account</span>
        </div>
        <form action="" className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
            {/* <img src={require("../../components/images/logo.png")} alt="" className="settingsImg" /> */}
            <img src={user.profilePic} alt="" />
            <br />
            <label htmlFor="fileInput">
            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <label > Username</label>
            <input type="text" placeholder={user.username} onChange = {e=>{setUsername(e.target.value)}}/>
            <label >Email</label>
            <input type="email" placeholder={user.email} onChange = {e=>{setEmail (e.target.value)}}/>
            <label >Password</label>
            <input type="password" onChange = {e=>{setPassword(e.target.value)}} />
            <button className="settingsSubmit" type="submit">Update</button>
        </form>
      </div>
        <Sidebar/>
      
    </div>
  )
}
