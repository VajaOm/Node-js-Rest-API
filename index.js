const http = require('http');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const handleRequest = require('./routes/user.routes.js');

dotenv.config();

const startServer = async () => {
    try {
        await connectDb();

        const server = http.createServer(handleRequest);

        const PORT = process.env.PORT || 3000;

        server.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
    } catch (error) {
        console.log("Error in starting server: ", error);
        throw error;
    }
}

startServer();