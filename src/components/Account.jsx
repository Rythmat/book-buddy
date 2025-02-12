import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Account = ({userInfo, setUserInfo}) => {
  const navigate = useNavigate();


  useEffect(() => {
    
    try {
      if(!localStorage.getItem('token')){
        navigate('/login');
        throw new Error('No token');
      }
      //Function to fetch the current users data after logging in or newly registering
      const getUser = async() => {
      const apiResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const userData = await apiResponse.json();
      setUserInfo(userData);
    }
    getUser();
    } catch (error) {
      
    }
    
  },[localStorage.getItem('token')])


  //Returns a specified book from the user's catalog
  const returnBook = async(bookId) => {
    
  }


  return (
    <>
    {
      
      userInfo?
      <div id='user'>
        <h1>{userInfo.firstname} {userInfo.lastname}</h1>
        <h2>{userInfo.email}</h2>
        <h3>Checked Out Books: </h3>
        <ul>
          {
          userInfo.books.map((book)=>{ return (
            <div>
              <li>{book.name}</li>
              <button onClick={()=>returnBook(book.id)}>Return this Book</button>
            </div>
          )})
          }
        </ul>
      </div>
      :
      <>
      <p style={{justifySelf: "center"}}>Pulling your data...</p>
      </>
    }
      
      
    </>
  )
}

export default Account