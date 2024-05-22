"use server";
import mongoose from 'mongoose';
import { connectDB } from "@/mongoose";
import { currentUser } from "@clerk/nextjs/server";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import Post from "../models/post.models";
import User from "../models/user.models";
import { PostData } from "./post.actions";
interface props {
  userId: string | undefined;
  username: string;
  name: string;
  bio: string;
  sport: String;
  image: string;
  type: string;
  phone: string;
  path: string;
}
export interface UserData {
  _id: string;
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  sport: string;
  phone: string;
  posts: PostData[];
  communities: string[];
  onboarding: boolean;
  type: string;
  friends: {
    _id: string;
    id: string;
    name: string;
    username: string;
    image: string;
  }[];
}
export interface Result {
  _id: string;
  name: string;
  image: string;
  id: string;
  sport: string;
  type: string;
  phone: string;
  posts: PostData[];
}
export async function updateUser({
  userId,
  username,
  sport,
  name,
  bio,
  image,
  path,
  type,
  phone,
}: props): Promise<void> {
  connectDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username,
        bio: bio,
        sport: sport,
        name: name,
        image: image,
        onboarding: true,
        phone: phone,
        type: type,
      },
      { upsert: true }
    );
    console.log("Successfully updated user");
    if (path.includes("/profile/edit")) {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(`failed to update user: ${error.message}`);
  }
}
export async function fetchUser(userId: string | undefined) {
  connectDB();
  try {
    let user: UserData | null = await User.findOne({ id: userId })
      .populate({
        path: "friends",
        model: User,
        select: "id image name username sport",
      })
      .lean();

    if (!user) {
      console.log("user not found");
      console.log("found user with id ");
    }

    console.log(user);
    return user;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchAllUser({
  searchString = "",
  pageNum = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString: string;
  pageNum: number;
  pageSize: number;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();
    let user = await currentUser();
    let skipAmount = (pageNum - 1) * pageSize;
    let regex = new RegExp(searchString, "i");
    let query: FilterQuery<typeof User> = { id: { $ne: user?.id } };
    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
        { sport: { $regex: regex } },
      ];
    }
    let users = await User.aggregate([
      { $match: query },
      { $sample: { size: pageSize } },
    ])
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .exec();
    const totalUsers = await User.countDocuments(query);
    let isNext = +totalUsers > skipAmount + users.length;
    return { users, isNext };
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export async function fetchUserPosts(userId: string) {
  connectDB();
  try {
    let posts: Result | null = await User.findOne({ id: userId })
      .populate({
        path: "posts",
        model: Post,
        populate: [
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "id name image",
            },
          },
        ],
      })
      .lean();
    return posts;
  } catch (error: any) {
    console.log(`not found user: ${error.message}`);
  }
}
export interface Activity {
  _id: mongoose.Types.ObjectId;
  type: "comment" | "reaction";
  author: {
    _id: mongoose.Types.ObjectId;
    name: string;
    image: string;
  };
  createdAt: Date;
  parentId: string;
}


export async function getActivity(userId: string) {
  await connectDB();  // تأكد من أن connectDB دالة تقوم بالاتصال بقاعدة البيانات
  try {
    const userPosts = await Post.find({ author: userId });
    const childPostIds = userPosts.reduce((acc: mongoose.Types.ObjectId[], post) => acc.concat(post.children), []);

    const replies = await Post.find({ _id: { $in: childPostIds }, author: { $ne: userId } })
      .populate({
        path: 'author',
        model: User,
        select: '_id name image',
      })
      .populate({
        path: 'react.user',
        model: User,
        select: '_id name image',
      })
      .populate({
        path: 'children',
        model: Post,
        populate: {
          path: 'author',
          model: User,
          select: '_id name image',
        },
      });

    return replies;
  } catch (e: any) {
    console.error(`Error fetching activity for user ${userId}: ${e.message}`);
    throw new Error(e.message);
  }
}


// export async function getActivity (userId:string) {
//     connectDB();
//     try {
//         let userPosts= await Post.find({author:userId})
//         let childPostIds= userPosts.reduce((acc :any , post : any) =>acc.concat(post.children),[])
//         let replies = await Post.find({_id:{$in:childPostIds},author:{$ne:userId}})
//         .populate({
//             path:'author',
//             model:User,
//             select:'_id name image'
//         })
//         return replies;
//     }catch(e:any){
//         console.log(`not found user: ${e.message}`);

//     }
// }
interface AddFriendParams {
  userId?: string;
  friendId: string;
  path: string;
  isFriend: boolean;
}
export async function addFriend({
  friendId,
  userId,
  path,
  isFriend,
}: AddFriendParams) {
  connectDB();
  try {
    if (!userId || !friendId) {
      console.log("userId أو friendId غير موجود");
      return;
    }

    const updateOperation = isFriend
      ? { $pull: { friends: friendId } }
      : { $push: { friends: friendId } };

    await User.findByIdAndUpdate(userId, updateOperation);
    await User.findByIdAndUpdate(
      friendId,
      isFriend ? { $pull: { friends: userId } } : { $push: { friends: userId } }
    );

    console.log("نجاح في إضافة/إزالة الصديق");
    revalidatePath(path);
  } catch (error: any) {
    console.log(`فشل في إضافة/إزالة الصديق: ${error.message}`);
  }
}
