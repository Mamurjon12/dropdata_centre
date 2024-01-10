function apiResponse(res, statusCode, data, error, pagination) {
    const response = {
        data: data || null,
        error: error || null,
        pagination: error || null,
        date: new Date
    }    
    res.status(statusCode).json(response)
}

module.exports = apiResponse