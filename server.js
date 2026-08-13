require('dotenv').config();
const connectdb=require('./src/config/db');
const app=require('./src/app');
const PORT=process.env.PORT||4700;

const startServer=async()=>{
    try{
        await connectdb();
        app.listen(PORT,()=>{
        console.log(`Server started successfully on PORT ${PORT}`);
        })
        
    }catch(error){
        console.log('Server startup Failed ',error);
        process.exit(1);
    }
}
startServer();


// Load environment variables
// Start server
// Listen on port