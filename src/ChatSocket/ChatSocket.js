const chatSocket = new WebSocket(
  'ws://'
  + '127.0.0.1:8000'
  + '/ws/'
);


chatSocket.onopen = function(event) {
  console.log("OPEN");
};