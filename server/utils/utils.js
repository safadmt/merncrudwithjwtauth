import jwt from 'jsonwebtoken'

export function generateToken (type, info) {
    
    return new Promise((resolve,reject)=> {
        let secret = type === 'accessToken' ? process.env.JWt_ACCESS_TOKEN : process.env.JWT_REFRESH_TOKEN
        let expires = type === 'accessToken' ? '15h' : '1d'

        jwt.sign(info, secret,{expiresIn:expires}, (err, token)=> {
        if(err) {
          reject(err)
        }
        resolve(token)
        })
    }) 

}