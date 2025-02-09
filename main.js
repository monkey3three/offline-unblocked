const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");

const server = express();
server.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

let mainWindow;
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Keep security in mind
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(`http://localhost:${PORT}/index.html`);
});
