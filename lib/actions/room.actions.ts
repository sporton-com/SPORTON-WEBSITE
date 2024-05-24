"use server";
import { connectDB } from "@/mongoose";
import Room from "../models/room.model";
import { revalidatePath } from "next/cache";
import { addFriend } from "./user.actions";
interface AddFriendParams {
    userId?: string;
    friendId: string;
    path: string;
  }
export async function GetChat({
    friendId,
    userId,
    path,
  }: AddFriendParams) {
    connectDB();
    try {
      if (!userId || !friendId) {
        console.log("userId أو friendId غير موجود");
        return;
      }
        const ChatRoom = await Room.findOne(
          { name: `${userId}-${friendId}` },
        );
        if (ChatRoom) {
            revalidatePath(path);
            return {chat: ChatRoom, ids: `${userId}-${friendId}`}
        }else{
            const ChatRoom2 = await Room.findOne(
                { name:`${friendId}-${userId}` },
            );
            if (ChatRoom2) {
                revalidatePath(path);
                return {chat: ChatRoom2, ids: `${friendId}-${userId}`}
            }else{
                let createChat = await addFriend({friendId: friendId, userId: userId,path: path,isFriend:true,isChat:true});
                revalidatePath(path);
                return {chat: createChat, ids: `${userId}-${friendId}`}
            }
        }
    } catch (error: any) {
      console.log(`فشل في إضافة/إزالة الصديق: ${error.message}`);
    }
  }
  