export default function errorHandler (err, req, res, next) {
    res.status(500).json({message: err.message,
         stack: err.stack, name: err.name,
          costom_message: "Something went wrong. Please try again later"})
    next();
  }