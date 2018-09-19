const wsUri= "ws://localhost:3002";
let websocket= new WebSocket(wsUri);

export default websocket;

/*

websocket.onopen= onOpen;
websocket.onclose=onClose;
websocket.onmessage=onMessage;
websocket.onerror=onError;




function OnClose() {
    websocket.close();
}

function onOpen(evt) {
    doSend("web socket funciona");
}

function onClose(evt) {
    //websocket.close();
    doSend("conexion cerrada");
}

function onMessage(evt) {
    console.log("mensaje: "+evt.data);
    //websocket.close();
}

function onError(evt) {
    console.log("error: "+evt.data);
}

function doSend(message) {
    console.log("enviado: "+message);
    websocket.send(message);
}
*/