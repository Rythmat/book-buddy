import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"


const BookDetails = () => {
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

  return (
    <>
      <h1>{bookDetails.title}</h1>
      <h2>by {bookDetails.author}</h2>
      {
        bookDetails.available ?
        <p style={{color: "green"}}>Available</p>
        :
        <p style={{color: "red"}}>Unavailable</p>
      }
      <img src={bookDetails.coverimage}></img>
      <p>{bookDetails.description}</p>
      <button onClick={()=>navigate('/')}>Back</button>
    </>
  )
}

export default BookDetails