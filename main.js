const { app, BrowserWindow } = require('electron');
const { GlobalKeyboardListener } = require("node-global-key-listener");

let win;
const keyboardListener = new GlobalKeyboardListener();
const keyState = new Map();


function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        alwaysOnTop: true, // 이 속성을 추가해!
    });

    win.loadFile('index_exe.html');
}

// 키 입력을 감지하고 UI에 전달
keyboardListener.addListener((event) => {
    // 이벤트를 Electron 윈도우에 전달
    if (win) {
        let state =  event._raw.split(',');
        event.rawKey.state=state[1];
        win.webContents.send('key-event', event.rawKey); // 키 값을 UI에 전송
    }
});
app.whenReady().then(createWindow);
