const mongoose = require('mongoose');
const userNotes = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    titles:{
        type: String,
        required: true,
        trim:true
    },
    notes:{
        type: String,
        required: true,
        trim:true
    },
    start_date:{
        type: Date
    },
    end_date:{
        type: Date
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

//module.exports = mongoose.model('notes', Notes);

const Notes = mongoose.model('notes',userNotes);

module.exports = Notes;