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

const getRawData = (api, genres, paging) => {}

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

const netflixSlice = createSlice({
  name: 'netflix',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genresLoaded = true
      state.genres = action.payload
    })
  },
})

export default netflixSlice.reducer
