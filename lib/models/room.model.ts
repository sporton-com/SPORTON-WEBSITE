
import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
    name: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Room = mongoose.models?.Room || mongoose.model('Room', chatRoomSchema);

export default Room;
