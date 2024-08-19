import jwt from 'jsonwebtoken'

function jwtVerify (req,res,next) {
    const authHeader = req.headers['authorization'] ;
    console.log(req.headers)
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    
    if(!token) return res.status(401).json("Unauthorised")

    jwt.verify(token, process.env.JWt_ACCESS_TOKEN, (err,token)=> {
        if(err) return res.status(403).json({message: "Forbidden"})
        req.user =token
        next()
    })
}

export default jwtVerify