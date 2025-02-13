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
      <h1 style={{justifySelf: "center"}}><img src='/src/components/images\book-icon.jpg' style={{height: "5vh",marginRight:'1vw'}}></img>Welcome to Book Buddy<img src='/src/components/images\book-icon.jpg' style={{height: "5vh",transform: 'scaleX(-1)',marginLeft:'1vw'}}></img></h1>
      <h2 style={{justifySelf: "center",marginBottom:0}}>Our Catalog:</h2>
      <ul style={{display:'flex',flexFlow:'row wrap', justifyContent:'center',marginTop:0}}>
        {
          books.map((book)=>{return (
            <div className='listBook' key={book.id}>
              
              <h3 style={{padding:0,marginBottom:0}}>{book.title}</h3>
              <h4 style={{padding:0,marginTop:0,marginBottom:0}}>by {book.author}</h4>
              {book.available?
                <p style={{color: "green",marginTop:0}}>Available</p>
                :
                <p style={{color: "red",marginTop:0}}>Unavailable</p>
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