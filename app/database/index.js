const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://pardal275:teste123@cluster0.wvwyo.mongodb.net/LinkApiDB?retryWrites=true&w=majority'

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
const connection = mongoose.connection

connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

module.exports = mongoose
