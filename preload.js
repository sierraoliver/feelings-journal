const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('journalAPI', {
  // Send data to save a new entry
  saveEntry: (feeling, text) => ipcRenderer.send('save-entry', { feeling, text }),
  
  // Retrieve all entries (returns a promise)
  getEntries: () => ipcRenderer.invoke('get-entries')
});