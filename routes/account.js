const express = require('express')
const router =express.Router()
const axios = require('axios')
const auth = require('../middleware/auth')

router.get("/register",(req,res)=>{
    res.render("register.ejs");
})

router.post("/register",(req,res) => {
    const username= req.body.username;
    const password =req.body.password;
    axios.post('http://13.234.136.82/account/register', {
        username,
        password
    })
        .then(function (response) {
            console.log(response)
            res.render("user-profile.ejs", {
                heading : 'Registered Successfully',
                username
            })
            res.status(200).send()
        })
        .catch(function (e) {
            console.log(e);
        });
})

router.get("/login", (req,res)=>{
    res.render("login.ejs");
})

router.post("/login",(req,res) => {
    const username= req.body.username;
    const password =req.body.password;

    axios.post('http://13.234.136.82/account/login', {
        username,
        password
    })
        .then((response, token) => {
            token = response.data.data.token
            auth.token = token
            console.log(auth.token)
            res.render("user-profile.ejs", {
                heading : 'Logged In Successfully',
                username
            })
            res.send()
        })
        .catch(function (e) {
            console.log(e);
        });
})



router.post("/updatePassword",(req,res)=>{
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const config = {
        headers: { Authorization: `Bearer ${auth.token}` }
    };

    axios.post('http://13.234.136.82/account/updatePassword', {
        oldPassword,
        newPassword
    }, config
        )
        .then((response) => {
            console.log(response);
            res.status(200).send()
        })
        .catch(function (e) {
            console.log(e);
        });
})

module.exports = router