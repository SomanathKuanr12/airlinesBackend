require('dotenv').config();
const { connectDb } = require('./src/config/db');  // ✅ get the function
const app = require('./src/app');
const PORT = process.env.PORT || 4700;

const startServer = async () => {
    try {
        await connectDb();   // ✅ now it's a function
        app.listen(PORT, () => {
            console.log(`Server started successfully on PORT ${PORT}`);
        });
    } catch (error) {
        console.log('Server startup Failed ', error);
        process.exit(1);
    }
};

startServer();
