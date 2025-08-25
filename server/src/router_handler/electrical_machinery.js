exports.btn = (req, res) => {
    const reqBody = req.body
    res.send({ status: 0, result: reqBody.value })
};