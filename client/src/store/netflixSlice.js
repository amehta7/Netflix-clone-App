import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, TMDB_BASE_URL } from '../utils/constants'

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
}

export const getGenres = createAsyncThunk('netflix/getGenres', async () => {
  const { data } = await axios.get(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )
  //console.log(data)
  return data.genres
})

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = []
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre)
      if (name) movieGenres.push(name.name)
    })
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      })
  })
}

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = []
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`)
    createArrayFromRawData(results, moviesArray, genres)
  }
  return moviesArray
}

export const fetchMovies = createAsyncThunk(
  'netflix/fetchMovies',
  async ({ type }, thunkAPI) => {
    const genres = thunkAPI.getState().netflix.genres
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    )
  }
)

export const filterByGenre = createAsyncThunk(
  'netflix/filterByGenre',
  async ({ genre, type }, thunkAPI) => {
    const genres = thunkAPI.getState().netflix.genres
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    )
  }
)

const netflixSlice = createSlice({
  name: 'netflix',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genresLoaded = true
        state.genres = action.payload
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload
      })
      .addCase(filterByGenre.fulfilled, (state, action) => {
        state.movies = action.payload
      })
  },
})

export default netflixSlice.reducer
