const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/patience', (req, res) => {
    res.send('Patience is power.Learn to control. Real control is total freedom');
  })

app.get('/idli', (req, res) => {
    res.send({idle:true, count:100,isChutney:true});
  })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})