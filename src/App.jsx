import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home.jsx'
import BookDetails from './components/BookDetails.jsx'
import Login from './components/Login.jsx'
import Account from './components/Account.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [logged, setLogged] = useState(Boolean(localStorage.getItem('token')));

  return (
    <>
    <NavBar setUserInfo={setUserInfo} setLogged={setLogged}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/books' element={<Home />} />
        <Route path='/books/:id' element={<BookDetails logged={logged}/>} />
        <Route path='/login' element={<Login setUserInfo={setUserInfo} userInfo={userInfo} setLogged={setLogged}/>} />
        <Route path='/account' element={<Account userInfo={userInfo} setUserInfo={setUserInfo} />} />
      </Routes>
    </>
  )
}

export default App
