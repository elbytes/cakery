
//custom error handling middleware
const notFound = (req, res, next)=>{
    const error = new Error(`Not Found ~ ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode //for when status is 200 but still an error
    res.status(statusCode);
    res.json({
        message: err.message
    });
}


export { notFound, errorHandler}