const express = require("express");
const userService = require('./userService.js');
const multer = require('multer')
const { verifyUser } = require("./userMiddleware.js");
const router = express.Router();
const upload = multer({ dest: 'uploads/',  limits: { fileSize: 5000000 }});


router.post('/send-otp', async (req, res)=>{
    let {email} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!email){
        result.status = 400;
        result.message = 'Email is required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }
    
    result = await userService.sendOtp(email);
    return res.status(result.status).json({body: result.body, message: result.message})
})

router.post('/verify-otp', async (req, res)=>{
    let {email, otp} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!email){
        result.status = 400;
        result.message = 'Email and OTP are required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }
    
    result = await userService.verifyOtp(email, otp);
    return res.status(result.status).json({body: result.body, message: result.message})
})

router.post('/profile', upload.single('photo'), verifyUser, async (req, res) => {
    try {
        const { firstName, lastName, cityId, stateId, countryId } = req.body;

        if(!req.userEmail){
            return res.status(401).json({message: 'Unauthorised Access', body: {}})
        }

        const photo = req.file;
        await userService.updateProfile(req.userEmail, firstName, lastName, cityId, stateId, countryId, photo);    

        res.status(201).json({ message: 'upload successful', body:{} });
    } catch (error) {
        console.log('Error', error.message);
        res.status(500).json({ message: 'some internal error occured', body:{} });
    }
});

module.exports = router;