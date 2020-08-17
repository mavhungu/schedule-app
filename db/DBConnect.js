const mongoose = require("mongoose");
const config = require('../config');
//const uri = process.env.ATLAS_URI;
const uri = 'mongodb+srv://gilbert:mavhunguro101@cluster0.raol9.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority';

//mongoose.connect('mongodb://localhost:27017/test-schedule',{


mongoose.connect( config.atlat_uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true
});


/*,(error, cleint)=>{
if(error){
    throw new Error(`unable to connect to database:?`);
}
});*/
/*mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`);
});*/