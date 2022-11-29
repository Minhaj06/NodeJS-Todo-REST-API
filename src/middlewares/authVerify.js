const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let token = req.headers['token-key'];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ status: "unauthorized" });
        } else {
            let email = decoded['data']['email'];
            req.headers.email = email;

            next();
        }
    });
};