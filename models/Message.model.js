const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    message:{
        type: String
    }
},
{
    timestamps: true
}
)

const Message = model("Message", messageSchema);

module.exports = Message;