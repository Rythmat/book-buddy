import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{

    const getBooks = async() =>{
      const apiResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
      const bookList = await apiResponse.json();
      setBooks(bookList.books)
    }

    getBooks();

  },[])


  
  return (
    <>
      <h1 style={{justifySelf: "center"}}>Welcome to Book Buddy</h1>
      <h2>Our Catalog:</h2>
      <ul>
        {
          books.map((book)=>{return (
            <div className='listBook' key={book.id}>
              <h3>{book.title}</h3>
              <h4>by {book.author}</h4>
              {book.available?
                <div>
                  <p style={{color: "green"}}>Available</p>
                </div>
                :
                <p style={{color: "red"}}>Unavailable</p>
              }
              <button onClick={()=>navigate(`/books/${book.id}`)}>Details</button>
              <hr></hr>
            </div>
          )})
        }

      </ul>
    </>
  )
}

export default Home