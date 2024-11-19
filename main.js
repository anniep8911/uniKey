const { app, BrowserWindow, ipcMain } = require('electron');
const { GlobalKeyboardListener } = require("node-global-key-listener");

let win;
const keyboardListener = new GlobalKeyboardListener();
const keyState = new Map();

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 500,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        alwaysOnTop: true, // 항상 최상위로 설정
    });

    win.loadFile('index_exe.html');
    
    // 윈도우 이동 처리: 렌더러에서 받은 x, y 좌표로 윈도우 이동
    ipcMain.on('move-window', (event, { x, y }) => {
        win.setBounds({ x, y, width: 1000, height: 600 });
    });
}

// 키 입력을 감지하고 UI에 전달
keyboardListener.addListener((event) => {
    if (win) {
        let state = event._raw.split(',');
        event.rawKey.state = state[1];
        win.webContents.send('key-event', event.rawKey);  // 키 값을 UI에 전송
    }
});

app.whenReady().then(createWindow);
