import "./header.css"

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React and Node</span>
            <span className="headerTitleLg">Blogs</span>
        </div>
        <img src={require("../images/1.jpg")} alt="" className="headerImg" />
      
    </div>
  )
}
