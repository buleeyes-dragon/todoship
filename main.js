var electron = require('electron')
const path = require("path");

var app = electron.app

var BrowserWindow = electron.BrowserWindow

var minWindow = null
app.on('ready',()=>{
    // const win = new BrowserWindow({ titleBarStyle: 'hidden' })
    const { Menu } = require('electron');
    Menu.setApplicationMenu(null);
    minWindow = new BrowserWindow({
        width:1200,
        height:800,
        // useContentSize: true,
        // frame: false  // 去掉默认的标题栏
        // titleBarStyle: "hidden",
        // titleBarOverlay: {
        //     color: "#fff",
        //     symbolColor: "black",
        // }
        icon: path.join(__dirname, 'todoship-logo.svg'),
    })
    minWindow.loadURL('http://localhost:3000/')

    minWindow.on('close',()=>{
        minWindow = null
    })
})

