const socket = io();
socket.emit("message", "Hola soy un cliente y me estoy comunicando desde WS");
socket.on("evento_para_socket", (data) => {
  console.log(data);
});
