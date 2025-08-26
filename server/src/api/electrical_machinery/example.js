const { SerialPort } = require('serialport');

class MotorController {
    constructor(portName = 'COM1', options = {}) {
        this.port = new SerialPort({
            path: portName,
            baudRate: options.baudRate || 9600,
            dataBits: options.dataBits || 8,
            stopBits: options.stopBits || 1,
            parity: options.parity || 'none'
        });

        this.port.on('error', (err) => {
            console.error('串口错误:', err.message);
        });

        this.port.on('open', () => {
            console.log(`串口 ${portName} 已打开`);
        });
    }

    // 发送命令到串口
    sendCommand(command) {
        return new Promise((resolve, reject) => {
            if (!this.port.isOpen) {
                reject(new Error('串口未打开'));
                return;
            }

            this.port.write(command, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // LED控制方法
    async leftLedOn() {
        const command = Buffer.from([0x1B, 0x51, 0x01]);
        await this.sendCommand(command);
        console.log('左灯亮');
    }

    async leftLedOff() {
        const command = Buffer.from([0x1B, 0x51, 0x04]);
        await this.sendCommand(command);
        console.log('左灯灭');
    }

    async rightLedOn() {
        const command = Buffer.from([0x1B, 0x52, 0x01]);
        await this.sendCommand(command);
        console.log('右灯亮');
    }

    async rightLedOff() {
        const command = Buffer.from([0x1B, 0x52, 0x04]);
        await this.sendCommand(command);
        console.log('右灯灭');
    }

    // 电机控制方法 - 立即执行，不等待
    rotateClockwise1_8() {
        const command = Buffer.from([0x1B, 0xBB, 0x06]);
        this.sendCommand(command).then(() => {
            console.log('电机正转1.8度');
        }).catch(console.error);
    }

    rotateCounterclockwise1_8() {
        const command = Buffer.from([0x1B, 0xCC, 0x06]);
        this.sendCommand(command).then(() => {
            console.log('电机反转1.8度');
        }).catch(console.error);
    }

    rotateClockwise45() {
        const command = Buffer.from([0x1B, 0xBB, 0x05]);
        this.sendCommand(command).then(() => {
            console.log('电机正转45度');
        }).catch(console.error);
    }

    rotateCounterclockwise45() {
        const command = Buffer.from([0x1B, 0xCC, 0x05]);
        this.sendCommand(command).then(() => {
            console.log('电机反转45度');
        }).catch(console.error);
    }

    rotateClockwise90() {
        const command = Buffer.from([0x1B, 0xBB, 0x04]);
        this.sendCommand(command).then(() => {
            console.log('电机正转90度');
        }).catch(console.error);
    }

    rotateCounterclockwise90() {
        const command = Buffer.from([0x1B, 0xCC, 0x04]);
        this.sendCommand(command).then(() => {
            console.log('电机反转90度');
        }).catch(console.error);
    }

    // 立即停止电机
    emergencyStop() {
        // 假设停止命令是 1B 00 00，请根据实际硬件协议修改
        const stopCommand = Buffer.from([0x1B, 0x00, 0x00]);
        this.sendCommand(stopCommand).then(() => {
            console.log('电机紧急停止');
        }).catch(console.error);
    }

    // 关闭串口
    close() {
        return new Promise((resolve) => {
            this.port.close(() => {
                console.log('串口已关闭');
                resolve();
            });
        });
    }

    // 检查串口是否打开
    isOpen() {
        return this.port.isOpen;
    }
}

// 使用示例
function runExample() {
    console.log('开始电机控制示例...');
    
    const motor = new MotorController('COM1');
    
    // 等待串口打开
    setTimeout(() => {
        if (!motor.isOpen()) {
            console.log('串口未打开，请检查连接');
            return;
        }
        motor.rotateCounterclockwise90();
        console.log('执行正转90度...');

        
        console.log('示例执行完成，命令已发送');
    }, 1000);
}

// 导出模块
module.exports = MotorController;