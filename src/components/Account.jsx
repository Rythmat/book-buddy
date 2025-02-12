import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Account = ({userInfo}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
  },[userInfo])


  return (
    <>
      <h1>{userInfo.firstname} {userInfo.lastname}</h1>
      <h2>{userInfo.email}</h2>
      <h3>Checked Out Books: </h3>
      <ul>
        {
        userInfo.books.map((book)=>{ return <li>{book.name}</li>})
        }
      </ul>
      
    </>
  )
}

export default Account