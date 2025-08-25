// const path = require('path');
// const grayscale = require(path.join(__dirname, '..', 'addon', 'grayscale', 'build', 'Release', 'grayscale-node.node'));

// Echo 测试函数
exports.echo = (req, res) => {
    const reqBody = req.body
    res.send({ status: 0, result: reqBody.value })
};