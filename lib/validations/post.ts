import * as z from "zod";

export const PostValidation = z.object({
  post: z.string().nonempty().min(3,{message:"minimum 3 characters required"}),
  accountId: z.string(),
});
export const CommentValidation = z.object({
  comment: z.string().nonempty().min(3,{message:"minimum 3 characters required"}),
});
export const PostValidation2 = z.object({
  post: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  // location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  // tags: z.string(),
  accountId: z.string(),
  isAchievement: z.string(),
});
