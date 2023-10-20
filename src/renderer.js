const { ipcRenderer } = require('electron');
console.log('here')
// get elements by id when page loads
document.addEventListener('DOMContentLoaded', () => {
  const login = document.getElementById('login');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const createAccountButton = document.getElementById('create-account');
console.log('got ids')
  // add event listenere to login form
  login.addEventListener('submit', (event) => {
    console.log('submit button clicked')
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Send the user input to the main process for further processing
    ipcRenderer.send('login-request', { username, password });
  });

  createAccountButton.addEventListener('click', () => {
    // Add logic to open a create account modal or navigate to the account creation page
    // You can use Electron's BrowserWindow for this.
  });
});