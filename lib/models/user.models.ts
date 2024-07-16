import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type: 'string', required: true},
    username: {type:'string', required: true},
    email: {type:'string'},
    name: {type:'string', required: true},
    phone: {type:'string', required: true},
    type:{type: 'string', required: true},
    image: {type:'string'},
    bio:{type:'string'},
    sport:{type:'string'},
    friends:[
        
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    onboarding: {type: 'boolean', default: false},
    messages: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    updatedAt: {
        type: Date,
        default: Date.now,
      },
 });
 const User = mongoose.models?.User || mongoose.model('User', userSchema);
 export default User;