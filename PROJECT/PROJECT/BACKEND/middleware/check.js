import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretkey=process.env.secretkey;
const authenticateus = (req, res, next) => {
    const cookies = req.headers.cookie;
    
    // Check if cookies are present
    if (!cookies) {
        return res.status(401).json({ message: 'You have to loginII' });
    }

    const cookieArray = cookies.split(';');
    let token;

    // Locate the authtoken in cookies
    for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'TOKEN') {
            token = value;
            break;
        }
    }

    // Check if token is available
    if (!token) {
        return res.status(401).json({ message: 'You have to login' });
    }

    // Verify token
    try {
        const verified = jwt.verify(token, secretkey);
        req.username = verified.username;
        req.userrole = verified.role;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'You have to login T' });
    }
};
export{authenticateus}