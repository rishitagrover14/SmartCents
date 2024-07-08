// Create, Send and Save the Token in Header

const sendToken = (user, statusCode, res) => {
    // Create JWT Token
    const token = user.getJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        user
    });
};

module.exports = sendToken;
