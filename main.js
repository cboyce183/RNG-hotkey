const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');

let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 200,
		height: 100,
		maxWidth: 200,
		maxHeight: 100,
		minWidth: 200,
		minHeight: 100,
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: __dirname + "/preload.js",
			nodeIntegration: true
		},
		transparent: true,
		alwaysOnTop: true
	});

	ipcMain.on("close-app", () => app.quit());

	win.loadFile('index.html');
	win.webContents.openDevTools()

	globalShortcut.register('CommandOrControl+O', () => {
        win.webContents.send('kp', Math.floor(Math.random() * 101));
    });
};

app.whenReady().then(() => {
	createWindow();
});

app.on('will-quit', () => {
	// Unregister a shortcut.
	globalShortcut.unregister('CommandOrControl+X')
  
	// Unregister all shortcuts.
	globalShortcut.unregisterAll()
});