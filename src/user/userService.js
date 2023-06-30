const jwt = require('jsonwebtoken')
const imgbbUploader = require('imgbb-uploader');
const userModel = require('./userModel');
const {getUserByEmail, createUser} = require('./userModel');
let otpArray = []

const sendOtp = async (email)=>{
    let result = {message:'', body: {}, status: 200};
    try {
      let user = await getUserByEmail(email);
      if(!user ){
        user = await createUser(email)
      }
      console.log(user)

      let otp =  Math.floor(Math.random() * (999999 - 100000) + 100001);

      let otpItemIndex = otpArray.indexOf(item => item.email == email);
      if(otpItemIndex > -1){
        otpArray[otpItemIndex].otp = otp;
      }else{
        otpArray.push({email: email, otp: otp, time: (new Date()).getTime()})
      }
      
      console.log('otp: ',otp)
      result.message = 'Otp sent successfully!'
    } catch (error) {
        console.log("error in the login: ", error)
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}

const verifyOtp = async (email, otp, userId)=>{
    let result = {message:'', body: {}, status: 200};
    try {      

       let otpItem = otpArray.find(item => item.email == email);
       if(!otpItem){
        result.message = 'OTP mismatch!';
        result.status= 401;
        return result;
       } 

       if((new Date()).getTime() - otpItem.time > 300000 ){
        result.message = 'OTP expired!';
        result.status= 401;
        return result;
       }

       if(otpItem.otp != otp){
        result.message = 'OTP mismatch!';
        result.status= 401;
        return result;
       }

       let user =await getUserByEmail(email)
      let token = jwt.sign({'user': user}, 'secretText');

      result.status = 200;
      result.message = 'Login successful!';
      result.body = {token}
    } catch (error) {
        console.log("error in the login: ", error)
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}


let updateProfile = async (email, firstName, lastName, cityId, stateId, countryId, photo) =>{
    try {
        const phtotoResult = await imgbbUploader('dc960e5d4d40839890678f4735a989f2', photo.path);
        await userModel.updateProfile(email, firstName, lastName, cityId, stateId, countryId, phtotoResult );    
    } catch (error) {
        console.log("error in profile update: ", error)
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }
    
}


module.exports ={
    sendOtp,
    verifyOtp,
    updateProfile
}