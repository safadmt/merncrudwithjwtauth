import { NextFunction, Request, Response } from "express"

function handleError (err:any, req:Request, res:Response, next:NextFunction) {
    console.log(err.message)
    res.status(500).json('Something went wrong!. Please try again later')
    next()
  }

export {handleError}