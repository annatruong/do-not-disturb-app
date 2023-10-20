const { app, BrowserWindow, ipcMain } = require('electron')
const dotenv = require('dotenv');
dotenv.config();
let authWindow;

const createMainWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in the renderer process
    },
    width: 800,
    height: 600
  })
  win.loadFile('src/index.html')
}


// const createAuthWindow = () => {
//   authWindow = new BrowserWindow({
//     width: 500,
//     height: 700,
//     show: false,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });
  
//   const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPE}`;
//   authWindow.loadURL(authUrl);

//   authWindow.once('ready-to-show', () => {
//     authWindow.show();
//   });

//   authWindow.on('closed', () => {
//     authWindow = null;
//   });

//   // ... Handle OAuth flow and redirection

//   // Other setup and event handling
// }

app.whenReady().then(() => {
    createMainWindow()
    // Create authentication window
    // createAuthWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
        // if (authWindow === null) {
        //   createAuthWindow();
        // }
      }
    })
  })
  
  app.on('window-all-closed', () => {
      app.quit()
  })

  // Define an IPC handler to receive the login request
ipcMain.on('login-request', (event, data) => {
  const { username, password } = data;
  console.log(`username: ${username}`);
  console.log(`password: ${password}`)
  
  // Perform the database check or other login-related logic here
  // For example, you can use database queries to verify the user's credentials
  
  // Example database check (replace with your actual database logic):
  // db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     if (results.length > 0) {
  //       // User exists, grant access
  //       // Send a response back to the renderer process if needed
  //       event.reply('login-response', { success: true });
  //     } else {
  //       // User doesn't exist or password is incorrect, send an error response
  //       event.reply('login-response', { success: false, error: 'Invalid credentials' });
  //     }
  //   }
  // });
});