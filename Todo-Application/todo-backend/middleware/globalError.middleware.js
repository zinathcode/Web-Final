const globalError = (err, req, res, next) => {
    const errorStatusCode = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(errorStatusCode).json({
        success: false,
        status: errorStatusCode,
        message: errorMessage,
    });
};

module.exports = globalError;
