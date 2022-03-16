const {contextBridge, ipcRenderer} = require('electron');


contextBridge.exposeInMainWorld("electron", { ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on } });
console.log(document)
contextBridge.exposeInMainWorld("api", {
	close: () => ipcRenderer.send("close-app"),
	keypress: () => ipcRenderer.on('kp', (_, payload) => {
		document.getElementById("rng").innerText = payload;
	})
})