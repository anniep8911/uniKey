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

    win.loadFile('index.html');
}

// 키 입력을 감지하고 UI에 전달
keyboardListener.addListener((event) => {
    // 이벤트를 Electron 윈도우에 전달
    if (win) {
        // console.log(event._raw);
        let state =  event._raw.split(',');
        event.rawKey.state=state[1];
        win.webContents.send('key-event', event.rawKey); // 키 값을 UI에 전송
    }
     // 키가 눌렸을 때 (keydown)
    //  if (event.eventType === 'keydown' && !keyState.has(event.rawKey)) {
    //     keyState.set(event.rawKey, 'down'); // 키 상태를 'down'으로 설정
    //     if (win) {
    //         win.webContents.send('key-event', { type: 'keydown', key: event.rawKey });
    //     }
    // }s

    // // 키가 떼졌을 때 (keyup)
    // if (event.eventType === 'keyup' && keyState.has(event.rawKey) && keyState.get(event.rawKey) === 'down') {
    //     keyState.set(event.rawKey, 'up'); // 키 상태를 'up'으로 설정
    //     if (win) {
    //         win.webContents.send('key-event', { type: 'keyup', key: event.rawKey });
    //     }
    // }
});
app.whenReady().then(createWindow);
