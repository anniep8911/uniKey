const { app, BrowserWindow } = require('electron');
const { GlobalKeyboardListener } = require("node-global-key-listener");

let win;
const keyboardListener = new GlobalKeyboardListener();

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        alwaysOnTop: true, // 이 속성을 추가해!
    });

    win.loadFile('index.html');
}

// 키 입력을 감지하고 UI에 전달
keyboardListener.addListener((event) => {
    // 이벤트를 Electron 윈도우에 전달
    if (win) {
        win.webContents.send('key-event', event.rawKey); // 키 값을 UI에 전송
    }
});
akjaskjdkj112323434546567678768789890

app.whenReady().then(createWindow);
