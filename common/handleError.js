module.exports = {
    handleErrorRes: function errorHandle (err, req, res, next) {
        res.status(500)
        res.render('error', {error: err})
    },
    handleValidationErrorDB: (err) => {
        const errors = Object.values(err.errors).map(el => el.message);
      
        const message = `Invalid input data. ${errors.join('. ')}`;
        return new AppError(message, 400);
      }
} 

