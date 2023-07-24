import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovies, getGenres } from '../store/netflixSlice'
import NotAvailable from '../components/NotAvailable'
import Slider from '../components/Slider'
import SelectGenre from '../components/SelectGenre'

const Movies = () => {
  const genres = useSelector((state) => state.netflix.genres)
  const movies = useSelector((state) => state.netflix.movies)
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded)

  const [isScrolled, setIsScrolled] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: 'movie' }))
    }
  }, [dispatch, genresLoaded])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    //if (currentUser) setUser(currentUser.uid)
    //else navigate('/login')
  })

  return (
    <Container>
      <div className='navbar'>
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className='data'>
        <SelectGenre genres={genres} type='movie' />
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <NotAvailable name='Movies' />
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`

export default Movies
