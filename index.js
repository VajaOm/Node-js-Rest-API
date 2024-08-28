const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const server = http.createServer((req, res) => {
    res.write('Route Accessed');
    res.end();
});

const PORT = process.env.PORT || 3000;;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})