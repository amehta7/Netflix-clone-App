import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TvShows from './components/TvShows'
import LikedMovies from './pages/LikedMovies'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/player' element={<Player />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv' element={<TvShows />} />
        <Route path='/mylist' element={<LikedMovies />} />
        <Route path='/' element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
