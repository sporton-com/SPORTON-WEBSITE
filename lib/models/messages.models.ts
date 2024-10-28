import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  content?: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  timestamp: Date;
  isRead: boolean;
  isDelivered: boolean;
  reactions: Array<{
    emoji: string;
    userId: mongoose.Types.ObjectId;
  }>;
  replyTo?: mongoose.Types.ObjectId; // يدعم الردود على الرسائل
}

const messageSchema = new mongoose.Schema<IMessage>({
  content: {
    type: String,
    required: function () {
      return this.type === 'text';
    }
  },
  mediaUrl: {
    type: String,
    required: function () {
      return this.type !== 'text';
    }
  },
  type: {
    type: String,
    enum: ['text', 'image', 'video', 'audio', 'file'],
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  reactions: [{
    emoji: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
});

const Message = mongoose.models?.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;
