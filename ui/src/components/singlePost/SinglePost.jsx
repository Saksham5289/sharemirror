import  axios  from "axios";
import { useContext, useEffect, useState } from "react";
import "./singlePost.css"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useSelector } from "react-redux";

export default function SinglePost() {
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  const [post,setPost] = useState({})
  const PF = "http://localhost:5000/images/";
  const user = useSelector((state)=>state.user.author)
  const [title,setTitle] = useState("") 
  const [desc,setDesc] = useState("") 
  const [updateMode,setUpdateMode] = useState(false) 

  const handleDelete = async()=>{
    try{

      await axios.delete(`/posts/${post._id}`, 
      {
       data: {username: user.username}
      },);
      window.location.replace("/")
    }catch(err){console.log(err)}
  }


  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
    };
    getPost();
  },[path])

const handleUpdate = async ()=>{
  try{

    await axios.put(`/posts/${post._id}`, 
    {
     username: user.username,title,desc
    });
    setUpdateMode(false)
  }catch(err){console.log(err)}
}


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&  (<img src={PF + post.photo} alt="" className="singlePostImg" />)}
        
      {
        updateMode ? <input type="text" value={title} className="singlePostTitleInput" onChange = {(e)=>setTitle(e.target.value)} autoFocus/> :(

          <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            
            
            <div className="singlePostEdit">
        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)} ></i>
        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
        </div>
          )}
        </h1>
          )
        }
        <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author: 
              <Link to={`/?user=${post.username}`}className="link">
              <b>{post.username}</b>
              </Link> 
              </span>
            <span className="singlePostDate">{new Date(post.createdAt).toDateString}</span>
        </div>
        {
          updateMode? (<textarea className="singlePostdescInput" value={desc} onChange = {(e)=>setDesc(e.target.value)}/>) :(

            <p className="singlePostdesc" >{desc}</p>
          )
        }
        {
          updateMode &&  <button className="singlePostButton" onClick={handleUpdate}>
          Update
                  </button>
        }
       
      </div>
    </div>
  )
}
