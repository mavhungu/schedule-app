const mongoose = require("mongoose");
const config = require('../config');
//const uri = process.env.ATLAS_URI;
 try {
     mongoose.connect('mongodb://localhost:27017/test-schedule', {

//mongoose.connect( config.atlat_uri,{
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true
     });
 }
catch(error){
    handleError(error);
}


/*,(error, cleint)=>{
if(error){
    throw new Error(`unable to connect to database:?`);
}
});*/
/*mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`);
});*/