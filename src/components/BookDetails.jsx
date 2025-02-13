import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"


const BookDetails = ({logged}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});


  //Fetching the details of the selected book, and fetching again if it's id changes
  useEffect(() => {
    const getDetails = async() => {
      const apiResponse = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
      const detailObj = await apiResponse.json();
      setBookDetails(detailObj.book);
    }
    getDetails();

  },[id])

  const checkout = async() => {

    //Function to checkout the book using the fetched user data
    const getBook = async() => {
      const apiResponse = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({available: false}),
      })
    }
    await getBook();
    navigate('/account');
  }


  return (

    <div id="details">
    {
      bookDetails?
      <>
      <h1 style={{padding:0,marginBottom:0}}>{bookDetails.title}</h1>
      <h2 style={{padding:0,marginTop:0,marginBottom:0}}>by {bookDetails.author}</h2>
      {
        bookDetails.available ?
        <div id="available">
          <p style={{color: "green",padding:0,textDecoration:'underline'}}>Available</p>
          {
            logged?
              <button onClick={checkout}>Checkout this Book</button>
            :
              <></>
          }
        </div>
        :
        <p style={{color: "red",padding:0,textDecoration:'underline'}}>Unavailable</p>
      }
      <img src={bookDetails.coverimage}></img>
      <p style={{width:'50vw',textAlign:'center',marginTop:'4vh'}}>{bookDetails.description}</p>
      <button onClick={()=>navigate('/')}>Back</button>
      </>
      :
      <p>Loading Book....</p>
    }
      
    </div>
  )
}

export default BookDetails