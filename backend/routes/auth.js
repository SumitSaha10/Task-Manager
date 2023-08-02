const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "sumitisacod@r";

//Route1 - Creating a user using post "/api/auth/createuser".No login required.
router.post('/createuser', [
    body('name', "Name must be atleast 5 characters").isLength({ min: 5 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors return bad requests
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Checking a user already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ success, error: "Please enter an valid email" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        //Crete a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user._id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (err) {
        console.log("Some error occured");
        res.status(500).send("Some error occured")
    }

});

//Route2 - Login a user using post "/api/auth/login".No login required.

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password must be atleast 5 characters').exists(),
], async (req, res) => {
    //If there are errors return bad requests

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            success = false;
            return res.status(404).json({ success, error: "Please try to login with correct credentials" });
        }
        const cPassword = await bcrypt.compare(password, user.password);
        if (!cPassword) {
            success = false;
            return res.status(404).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user._id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (err) {
        console.log("Some error occured");
        res.status(500).send("Some error occured")
    }
});

//Route3 - Get loggedin user details using post "/api/auth/getuser".Login required.

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.id;
        const user = await User.findOne({ _id: userid }).select("-password");
        res.send(user);
    }
    catch (err) {
        console.log("Some error occured");
        res.status(500).send("Some error occured")
    }
});


module.exports = router;