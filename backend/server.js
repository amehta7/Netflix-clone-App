const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/User')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)

mongoose
  .connect(
    'mongodb+srv://netflixUser:OvOtIoMZHRUrlcA0@cluster0.a0wzikd.mongodb.net/netflix?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB connected!!!')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(5000, () => console.log('Server is running on port 5000'))
