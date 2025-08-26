import MotorController from './example'
const motor = new MotorController('COM1');
motor.open()


const test = (ipcMain) => {
  ipcMain.handle('electrical_machinery:test', async (_event: Error, data:{dir:number,degree:number}) => {
    try {
      
      if(data.dir){
          if(data.degree===90){
              motor.rotateClockwise90()
          }
      }else{
          if(data.degree===90){
              motor.rotateCounterclockwise90()
          }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })

}

export default test
