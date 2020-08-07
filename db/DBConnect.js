const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/test-schedule',{
    useUnifiedTopology:true,
    useNewUrlParser:true
},(error, cleint)=>{
if(error){
    throw new Error(`unable to connect to database:`);
    console.log('Error');
}
});
/*mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`);
});*/