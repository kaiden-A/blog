import User from '../models/user.js'
import jwt from 'jsonwebtoken';


const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {

    return jwt.sign({id} ,process.env.JWT_SECRET , {expiresIn : maxAge} )
}

export const get_signIn = (req , res)=>{
    res.render('signIn' );
}


export const post_signIn = async (req , res) => {
    
    try{

        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error : 'Invalid Email'});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({error : "Incorrect Password"});
        }

        const token  = createToken(user._id);

        res.cookie('jwt' , token , {httpOnly: true , maxAge : maxAge * 1000})
        res.json({success : `Succesfully sign in ! Hello ${user.username}`});

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Server error'})
    }
}

export const get_signUp = (req , res) => {
    res.render('signUp')
}


export const post_signUp = async (req , res) => {

    try{

        const {email , username , password} = req.body;

        const isHave = await User.findOne({email : email});
        const isValid = (password) => {
            return password.length >= 6;
        }

        if(!isValid(password)){
            return res.status(400).json({error : 'Password must be at least 6 characters long'})
        }


        if(isHave){
            return res.status(400).json({error : 'Email is already taken'});
        }

        const user = new User({
            email ,
            username,
            password
        })

        const savedUser = await user.save();

        const token = createToken(savedUser._id);

        res.cookie('jwt' , token , {httpOnly: true , maxAge : maxAge * 1000 })
        res.json({success : "succesfully add to the database"})


    }catch(err){

        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: messages[0] });
        }

        res.status(500).json({error : 'Server Error'});

    }
}


export const get_logout = (req , res) => {
    res.cookie('jwt' , '' , {maxAge: 1});
    res.redirect('/admin')
}