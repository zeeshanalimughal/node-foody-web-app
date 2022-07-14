const User = require('../models/user.model')
const bcrypt = require('bcryptjs')



exports.registerUser = async (req, res) => {

    console.log(req.body);
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(403).json({ message: "All fields are required", status: false });
    }

    let user = await User.find({ 'email': email })
    console.log(user.length)
    if (user.length > 0) {
        return res.status(403).json({ message: "User already exists", status: false });
    }

    let hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    });

    newUser.save().then(function (user) {
        res.send({message:"Registered successfully", status: true});
    }).catch(err => {
        return res.status(500).json({ message: "INTERNAL ERROR", error: err });
    })
}




exports.loginUser = async (req, res) => {

    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ message: "All fields are required", status: false });
    }

    await User.findOne({ "email": email }).then(async function (user) {
// console.log(user)
        if (user ) {
            console.log(user.password);
            bcrypt.compare(password, user.password, function (err, result) {
                if(result===true){
                    return res.status(201).json({ 
                        message: "Login Successfull",
                    data:{name:user.name,email:user.email},
                    status: true })
                }else{
                    return res.status(403).json({ message: "USERNAME OR PASSWORD IS INCORRECT", status: false });
                }
            })
        }else{
            return res.status(403).json({ message: "USERNAME OR PASSWORD IS INCORRECT", status: false });
        }
    }).catch(err => console.log(err));







    // await User.findOne({ 'email': email }, function (err, user) {
    //     if (err) {
    //         return res.status(403).json({ message: "Something went wrong", status: false });
    //     }
    //     if (user && user.length > 0) {
    //         console.log(user);
    //         bcrypt.compare(password, user.password, function (err, result) {
    //             if (result === false) {
    //                 return res.status(403).json({ message: "USERNAME OR PASSWORD IS INCORRECT", status: false });
    //             } else {
    //                 return res.status(201).json({ message: "Login Successfull", status: true })
    //             }

    //         })

    //     } else {
    //         return res.status(403).json({ message: "USERNAME OR PASSWORD IS INCORRECT", status: false });
    //     }
    // })




}