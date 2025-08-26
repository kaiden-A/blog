import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export default  function  requireAuth(req , res , next){

    const token = req.cookies.jwt;

    if(token){

        jwt.verify(token , process.env.JWT_SECRET, async (err , decodedToken) => {

            if(err){
                console.log(err.message);
                res.redirect('/admin/login');
            }else{
                
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        })

    }else{

        res.redirect('/admin/login');
    }
}   