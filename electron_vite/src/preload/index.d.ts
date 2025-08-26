import { ElectronAPI } from '@electron-toolkit/preload'
import { promises } from 'dns'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      test: {
        echo: (str: string) => promises<string>
      }
      electrical_machinery: {
        test: (str: string) => promises<string>
      }
    }
  }
}
