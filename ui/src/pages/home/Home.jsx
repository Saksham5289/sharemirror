
import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios  from "axios"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts,setPosts] = useState([]);
  const location = useLocation();

  console.log(location);
  

  useEffect(()=>{
    const fetchPosts = async ()=>{
    const res = await axios.get("/posts"+location.search);
    
    setPosts(res.data);
  }
  fetchPosts();
  },[location.search])
  return (
   <>  
     <Header/>
    <div className="home"> 
    <Posts posts={posts}/>
    <Sidebar/>
    </div>
     
   
    </>

  )
}
