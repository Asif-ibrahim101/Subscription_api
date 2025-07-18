import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export default async function authorize(req, res, next) {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}
