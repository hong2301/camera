const MotorController=require('./example.js')

exports.btn = (req, res) => {
    const reqBody = req.body
     const motor = new MotorController('COM1');
    
    if(reqBody.value){
        if (!motor.isOpen()) {
            res.send({ code: 200, msg:'串口未打开，请检查连接',data:{btn:0} })
        }else{
            res.send({ code: 200, msg:'串口已打开',data:{btn:1} })
        }
    }else{
        motor.close()
        if (!motor.isOpen()) {
            res.send({ code: 200, msg:'串口已关闭',data:{btn:0} })
        }else{
            res.send({ code: 200, msg:'串口关闭失败',data:{btn:1} })
        }
    }

};