'use client'
import * as z from "zod";
import {useState} from "react";
import { useForm } from "react-hook-form";
import { useRouter,useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
} from "@/components/ui/form";
 import Image from "next/image"
import {Button,
} from "@/components/ui/button";
import {
    Input,
 
} from "@/components/ui/input";
import {
    Textarea,
} from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import  FileUploader  from "@/components/shared/FileUploader";
// import   Loader  from "@/components/shared/Loader";
import { PostValidation2 } from '../../lib/validations/post';
import { createPost } from "@/lib/actions/post.actions";

type PostFormProps = {
  post?: any;
  action?: "Create" | "Update";
  path: string;
  id: string;
  image:string;
name:string;
username:string;
};

const PostForm =  ({ post, action,path,id ,image,
  name,
  username}: PostFormProps) => {
  const navigate = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PostValidation2>>({
    resolver: zodResolver(PostValidation2),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });
  let SearchParams= useSearchParams()
  let sh=SearchParams.get('s')
  let [show,setShow]= useState(sh?true:false)
  // Query

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation2>) => {
    // ACTION = UPDATE
    // if (post && action === "Update") {
    //   const updatedPost = await updatePost({
    //     ...value,
    //     postId: post.$id,
    //     imageId: post.imageId,
    //     imageUrl: post.imageUrl,
    //   });

    //   if (!updatedPost) {
    //     toast({
    //       title: `${action} post failed. Please try again.`,
    //     });
    //   }
    //   return navigate.push(`/posts/${post.$id}`);
    // }

    // ACTION = CREATE
    const newPost = await createPost({
        //   ...value,
        text:'',
        communityId:'',
        path:path,
         author: id ,
    });

    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex -translate-y-24 flex-col gap-6 w-full  max-w-5xl">
           <div className="flex gap-4 items-center justify-between">
          <Button
            type="button"
            className="h-8 bg-dark-4  text-light-1 flex gap-2"
            onClick={() => navigate.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-500 h-8 hover:bg-primary-500 text-light-1 flex gap-2 whitespace-nowrap"
            >
            {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />} */}
            {action} Post
          </Button>
        </div>
        <div className=" flex  gap-4">
                
                <Image src={image} alt={''} height={48} width={48} className={'rounded-full object-contain'}/>
                <div className=" flex flex-col gap-1">
                  <h4 className=' text-white text-body-bold'>{name}</h4>
                  <p className=' text-gray-500 text-small-regular'>@{username}</p>
                </div>
              </div>
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-white">Caption</FormLabel> */}
              
              <FormControl>
                <Textarea
                placeholder="What are you thinking?"
                  className={`${show?'h-20':'h-80'} bg-transparent rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-transparent custom-scrollbar`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        
       {show&& <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />}

        {/* <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        /> */}
<div className="flex justify-end p-0 items-center">
              <Button
            type="button"
            className="bg-transparent "
            onClick={e=>setShow(!show)}>
            <Image src={'/assets/createimg.svg'} alt={''} height={30} width={30} className={'rounded-full object-contain'}/>
          </Button></div>
       
      </form>
    </Form>
  );
};

export default PostForm;