const socket = io();



socket.emit("message", "Cliente conectado");
socket.on("evento_para_socket", (data) => {
  console.log(data);
});
