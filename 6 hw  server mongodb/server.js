const http = require('http');
const server = http.createServer(listener);
server.listen(4000, '192.168.1.1');