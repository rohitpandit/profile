const express = require('express');
const cors = require('cors');
const user = require('./user/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/user',user);

app.get('*' , (req, res)=>{
    console.log("ssss")
    let result = {}
    result.body = {}
    result.status = 404;
    result.message = 'Page Not Found!'
    return res.status(result.status).json({body: result.body, message: result.message})
})

app.listen(PORT,()=>{
    console.log("App listening at port: ", PORT)
})