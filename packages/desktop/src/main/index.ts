import { app, BrowserWindow } from 'electron'
import { pathToFileURL } from 'url'
import path from 'path'

let mainWindow: BrowserWindow | null = null

const createMainWindow = () => {
  if (mainWindow !== null) return
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  if (process.env.NODE_ENV === 'development') {
    import('electron-devtools-installer').then((module) => {
      module
        .default(module.REACT_DEVELOPER_TOOLS)
        // eslint-disable-next-line no-console
        .then((name) => console.log(`Added Extension: ${name}`))
        // eslint-disable-next-line no-console
        .catch((err) => console.log('An error occurred: ', err))
    })
    mainWindow.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    )
  } else {
    mainWindow.loadURL(pathToFileURL(path.join(__dirname, 'index.html')).href)
  }
}

app.on('activate', () => createMainWindow)

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  app.quit()
})
