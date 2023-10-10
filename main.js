const { app, BrowserWindow } = require('electron')
const dotenv = require('dotenv');
dotenv.config();
let authWindow;

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('src/index.html')
}


const createAuthWindow = () => {
  authWindow = new BrowserWindow({
    width: 500,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPE}`;
  authWindow.loadURL(authUrl);

  authWindow.once('ready-to-show', () => {
    authWindow.show();
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });

  // ... Handle OAuth flow and redirection

  // Other setup and event handling
}

app.whenReady().then(() => {
    createMainWindow()
    // Create authentication window
    createAuthWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
        if (authWindow === null) {
          createAuthWindow();
        }
      }
    })
  })
  
  app.on('window-all-closed', () => {
      app.quit()
  })