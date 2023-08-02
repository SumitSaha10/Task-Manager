const mongoose = require("mongoose");
const express = require('express')
const connectToMongo = require('./db')
var cors = require("cors")

connectToMongo()


const app = express()
const port = 6000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {

})
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))



app.listen(port, () => {
  console.log(`Mynotebook app backend listening on port http://localhost:${port}`)
})