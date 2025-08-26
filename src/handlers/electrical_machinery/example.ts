import { SerialPort } from 'serialport'

class MotorController {
  port: SerialPort

  constructor(
    portName = 'COM1',
    options: {
      baudRate?: number
      dataBits?: 8 | 5 | 6 | 7 | undefined
      stopBits?: 1 | 1.5 | 2 | undefined
      parity?: 'none' | 'even' | 'odd' | 'mark' | 'space'
      autoOpen?: boolean
    } = {}
  ) {
    this.port = new SerialPort({
      path: portName,
      baudRate: options.baudRate || 9600,
      dataBits: options.dataBits || 8,
      stopBits: options.stopBits || 1,
      parity: options.parity || 'none',
      autoOpen:false
    })

    this.port.on('error', (err) => {
      console.error('串口错误:', err.message)
    })

    this.port.on('open', () => {
      console.log(`串口 ${portName} 已打开`)
    })
  } 

  // 新增打开串口的方法
  open(callback?: () => void) {
    this.port.open((err) => {
      if (err) {
        console.error('打开串口失败:', err.message)
        return
      }
      console.log(`串口 ${this.port.path} 已打开`)
      if (callback) callback()
    })
  }

  // 发送命令到串口
  sendCommand(command) {
    return new Promise<void>((resolve, reject) => {
      if (!this.port.isOpen) {
        reject(new Error('串口未打开'))
        return
      }

      this.port.write(command, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  } // LED控制方法

  async leftLedOn() {
    const command = Buffer.from([0x1b, 0x51, 0x01])
    await this.sendCommand(command)
    console.log('左灯亮')
  }

  async leftLedOff() {
    const command = Buffer.from([0x1b, 0x51, 0x04])
    await this.sendCommand(command)
    console.log('左灯灭')
  }

  async rightLedOn() {
    const command = Buffer.from([0x1b, 0x52, 0x01])
    await this.sendCommand(command)
    console.log('右灯亮')
  }

  async rightLedOff() {
    const command = Buffer.from([0x1b, 0x52, 0x04])
    await this.sendCommand(command)
    console.log('右灯灭')
  } // 电机控制方法 - 立即执行，不等待

  rotateClockwise1_8() {
    const command = Buffer.from([0x1b, 0xbb, 0x06])
    this.sendCommand(command)
      .then(() => {
        console.log('电机正转1.8度')
      })
      .catch(console.error)
  }

  rotateCounterclockwise1_8() {
    const command = Buffer.from([0x1b, 0xcc, 0x06])
    this.sendCommand(command)
      .then(() => {
        console.log('电机反转1.8度')
      })
      .catch(console.error)
  }

  rotateClockwise45() {
    const command = Buffer.from([0x1b, 0xbb, 0x05])
    this.sendCommand(command)
      .then(() => {
        console.log('电机正转45度')
      })
      .catch(console.error)
  }

  rotateCounterclockwise45() {
    const command = Buffer.from([0x1b, 0xcc, 0x05])
    this.sendCommand(command)
      .then(() => {
        console.log('电机反转45度')
      })
      .catch(console.error)
  }

  rotateClockwise90() {
    const command = Buffer.from([0x1b, 0xbb, 0x04])
    this.sendCommand(command)
      .then(() => {
        console.log('电机正转90度')
      })
      .catch(console.error)
  }

  rotateCounterclockwise90() {
    const command = Buffer.from([0x1b, 0xcc, 0x04])
    this.sendCommand(command)
      .then(() => {
        console.log('电机反转90度')
      })
      .catch(console.error)
  } // 立即停止电机

  emergencyStop() {
    // 假设停止命令是 1B 00 00，请根据实际硬件协议修改
    const stopCommand = Buffer.from([0x1b, 0x00, 0x00])
    this.sendCommand(stopCommand)
      .then(() => {
        console.log('电机紧急停止')
      })
      .catch(console.error)
  } // 关闭串口

  close() {
    return new Promise<void>((resolve) => {
      this.port.close(() => {
        console.log('串口已关闭')
        resolve()
      })
    })
  } // 检查串口是否打开

  isOpen() {
    return this.port.isOpen
  }
}

// 导出模块
export default MotorController;
