import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token){
        return res.send({status: 401, errors: [{ msg: "No token, authorization denied" }]});
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded_token.user
        next();
        
    } catch (err) {
        return res.send({status: 401, errors: [{ msg: "Token is invalid, authorization denied" }]});
    }
}   

export default Auth;