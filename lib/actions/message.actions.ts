import User from '../models/user.models';
import Message from '../models/messages.models';


export const createMessage = async (
  senderId: string,
  recipientId: string,
  content: string
): Promise<void> => {
  try {
    const newMessage = await Message.create({
      content,
      sender: senderId,
      recipient: recipientId,
    });
    await User.findByIdAndUpdate(senderId, {
      $push: { messages: newMessage._id },
    });
    await User.findByIdAndUpdate(recipientId, {
      $push: { messages: newMessage._id },
    });
  } catch (error) {
    console.error('Error creating message and adding to user:', error);
    throw error;
  }
};
