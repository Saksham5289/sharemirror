import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cat,setCats] = useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img src={require("../images/2.jpg")} alt="" className="aboutMeImg" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius inventore porro iusto consectetur provident quam, mollitia asperiores recusandae accusamus repellat quaerat quas labore optio. Doloribus quaerat, cupiditate minus cumque suscipit voluptates alias, adipisci obcaecati sapiente voluptatum hic magnam consectetur?</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map(c=>(
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">FOLLOW US</div>
        <div className="sidebarSocial">
        <i className="sidebarIcon fa-brands fa-facebook"></i>
      <i className="sidebarIcon fa-brands fa-square-twitter"></i>
      <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
      <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  )
}
