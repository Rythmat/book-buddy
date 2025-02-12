import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home.jsx'
import BookDetails from './components/BookDetails.jsx'
import Login from './components/Login.jsx'
import Account from './components/Account.jsx'

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/books' element={<Home />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/login' element={<Login setUserInfo={setUserInfo} userInfo={userInfo}/>} />
        <Route path='/account' element={<Account userInfo={userInfo}/>} />
      </Routes>
    </>
  )
}

export default App
