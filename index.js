const http = require('http');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');

dotenv.config();

const startServer = async () => {
    try {
        await connectDb();

        const server = http.createServer((req, res) => {
            res.write('Route Accessed');
            res.end();
        });

        const PORT = process.env.PORT || 3000;;

        server.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
    } catch (error) {
        console.log("Error in starting server: ", error);
        throw error;
    }
}

startServer();