const http = require('http')
const app = require('../src/app')
const port = parseInt(process.env.port, 10) || 3000
const server = http.createServer(app)

server.listen(port);
server.on('listening', onListening)
console.log(`Api inicializada na porta ${port}`)


//func p inicializar a aplicação
function onListening(){
    const addr = server.address();
    bind = typeof addr == 'string' ? 'pipe' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind)
}