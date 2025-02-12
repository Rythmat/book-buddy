import { Link } from "react-router-dom"

const NavBar = ({setUserInfo}) => {

  const logOut = () =>{
    localStorage.removeItem('token');
    setUserInfo(null);
  }

  return (
    <>
    <div id="navbar">
        <Link to='/'><img src='/src/components/images\home-icon.jpg' style={{height: "5vh"}}></img></Link>
        <div id='log'>
          <Link to='/account'><img src='/src/components/images\user-icon.jpg' style={{height: "5vh"}}></img></Link>
          {
            localStorage.getItem('token')?
            <button id='logout' onClick={logOut}>Logout</button>
            :
            <></>
          }
        </div>
        
    </div>
    </>
  )
}

export default NavBar