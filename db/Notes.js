const mongoose = require('mongoose');
/*const schema = mongoose.Schema;
const Notes = new schema({
    titles:{
        required: true,
        type: String,
        trim: true
    },
    notes:{
        required: true,
        type: String,
        trim: true
    }});
module.exports = mongoose.model('notes', Notes);*/


const Notes = mongoose.model('notes',{
    titles:{
        type: String,
        required: true,
        trim:true
        /*validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Name can contain letters/Alpgabets')
            }
        }*/
    },
    notes:{
        type: String,
        required: true,
        trim:true
    },
    completed:{
        type: Boolean
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date
    }

});

module.exports = Notes;