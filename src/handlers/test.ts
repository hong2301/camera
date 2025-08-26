const test = (ipcMain) => {
  ipcMain.handle('test:echo', async (_event: Error, str: string) => {
    try {
      return { success: true, data: str }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  })
}

export default test
