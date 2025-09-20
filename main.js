const { app, BrowserWindow, ipcMain  } = require('electron')

const path = require('path');
const Database = require('better-sqlite3');
const db = new Database('journal.db');

// Ensure the table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feeling TEXT,
    text TEXT,
    date TEXT
  )
`).run();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') 
    }
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('save-entry', (event, { feeling, text }) => {
  db.prepare("INSERT INTO entries (feeling, text, date) VALUES (?, ?, ?)")
    .run(feeling, text, new Date().toISOString());
});

ipcMain.handle('get-entries', () => {
  return db.prepare("SELECT * FROM entries ORDER BY date DESC").all();
});