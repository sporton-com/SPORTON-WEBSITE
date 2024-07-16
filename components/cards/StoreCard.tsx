"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface parms {
  id: string;
  image?: string;
  video?: string;
  userId: string | undefined;
  author: {
    _id: string;
    id: string;
    name: string;
    image: string;
    sport: string;
  };
  content: string;
  createdAt: string;
}

const StoreCard = ({
  id,
  userId,
  author,
  content,
  createdAt,
  video,
  image,
}: parms) => {


  const SocialShare = ({ url, title }: { url: string; title: string }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedMessage = encodeURIComponent(`${title} \n  ${url}`);
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    return (
      <div className={"flex justify-center gap-5"}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div onClick={copyToClipboard}>
                <Image
                  src={`/assets/copy.svg`}
                  alt="heart"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Copy link </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer">
                <Image
                  src={`/assets/facebook.svg`}
                  alt="heart"
                  height={40}
                  width={40}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on Facebook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer">
                <Image
                  src={`/assets/twitter.svg`}
                  alt="heart"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on Twitter</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://api.whatsapp.com/send?text=${encodedMessage}`}
                target="_blank"
                rel="noopener noreferrer">
                <Image
                  src={`/assets/whatsapp.svg`}
                  alt="heart"
                  height={30}
                  width={30}
                  className=" hover:scale-125 cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-[#ffffff]">
              <p className="text-primary-500">Share on WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };
  //?????????? end SocialShare
  //!!!!!!!! SocialShare
  let IconsFooter = ({
    isMessenger,
    isWhite,
  }: {
    isMessenger?: boolean;
    isWhite?: boolean;
  }) => (
    <div className={` flex flex-col `}>
     
      <div className="mt-3 flex flex-row items-center gap-6">
     
        
       
        {!isMessenger  && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/messaging/"+userId+"-"+ author._id} className="">
                  <Image
                    src={`/assets/messnger${isWhite ? "-white" : ""}.svg`}
                    alt="repost"
                    height={20}
                    width={20}
                    className="hover:scale-125 cursor-pointer object-contain"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-[#ffffff]">
                <p className="text-primary-500">messaging {author.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Drawer>
          <DrawerTrigger>
            <Image
              src={`/assets/share${isWhite ? "-white" : ""}.svg`}
              alt="share"
              height={20}
              width={20}
              className="hover:scale-125 cursor-pointer object-contain"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className={"absolute right-[10%] top-5"}>
                <DrawerClose>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={`/assets/close.svg`}
                          alt="repost"
                          height={30}
                          width={30}
                          className="hover:scale-125  cursor-pointer object-contain"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#ffffff]">
                        <p className="text-primary-500">close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DrawerClose>
              </div>
              <div className={"flex flex-col  items-center gap-5"}>
                <DrawerTitle>It’s Time to share</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <SocialShare
                url={`https://www.sporton.website/post/${id}`}
                title={content}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
  let DropDown = ({ isBlack }: { isBlack?: boolean }) => (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={`/assets/points-virtical${isBlack ? "-white" : ""}.svg`}
            alt={"points"}
            height={5}
            width={5}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <Link href={"/profile/" + author.id} className="flex gap-2">
              <Image
                src={"/assets/edit.svg"}
                alt={author.name}
                height={20}
                width={20}
              />
              <p>Edit post</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  
  return (
    <article
      className={` flex w-full flex-col mb-10 rounded-xl ${
         "bg-dark-2 p-5"
      }`}>
      <div className=" flex items-start justify-between">
        <div className=" flex w-full flex-1 flex-row gap-4 ">
          <div className=" text-white hidden flex-col items-center lg:flex ">
            <Link href={"/profile/" + author.id} className="relative w-11 h-11">
            <div className="relative   aspect-square h-10 w-10  ">
                      <img
                        src={author.image}
                        alt={author.name}
                        className="absolute inset-0 w-full h-full rounded-full object-cover"
                      />
                    </div>
              {/* <Image
                src={author.image}
                alt={author.name}
                fill
                className="cursor-pointer rounded-full"
              /> */}
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className=" text-white flex flex-col gap-4 w-full  ">
            <div className="flex w-full flex-1 flex-row gap-4 ">
              <div className="flex w-full flex-1 flex-row gap-4 ">
                <div className=" text-white flex flex-col items-center lg:hidden ">
                  <Link
                    href={"/profile/" + author.id}
                    className="relative w-11 h-11">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="cursor-pointer rounded-full"
                    />
                  </Link>
                  
                </div>
                <div className="">
                  <Link
                    href={"/profile/" + author.id}
                    className=" cursor-pointer w-full flex gap-4 ">
                    <div className=" cursor-pointer w-full flex gap-[3px]">
                      <h5>{author.name}</h5>
                    
                    </div>
                  
                  </Link>
                </div>
              </div>
              {author._id === userId && <DropDown isBlack />}
            </div>
            <p className=" text-small-regular text-light-2 ">{content}</p>
            {image && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="max-sm:px-0 px-16">
                    <div className="relative max-sm:aspect-square max-md:aspect-video aspect-square  mb-5">
                      <img
                        src={image}
                        alt="post image"
                        className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className=" flex justify-between">
                      {author._id === userId ? <DropDown /> : <div></div>}
                      <AlertDialogTitle
                        className={"text-[#ffffff] text-center"}>
                        <h5>@{author.name}</h5>
                      </AlertDialogTitle>
                      <AlertDialogCancel>
                        <Image
                          src={"/assets/back.svg"}
                          alt={"points"}
                          height={15}
                          width={15}
                        />
                      </AlertDialogCancel>
                    </div>
                    <AlertDialogDescription>
                      <div className="max-sm:px-0 px-16">
                        {/* <div className="relative max-sm:aspect-square max-md:aspect-video aspect-square  mb-5"> */}
                        <img
                          src={image}
                          alt="post image"
                          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
                        />
                        {/* </div> */}
                      </div>
                    </AlertDialogDescription>
                    <AlertDialogDescription
                      className={"text-[#ffffff] text-center"}>
                      {content}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex justify-center w-full">
                      {author._id !== userId ? (
                        <IconsFooter isWhite />
                      ) : (
                        <IconsFooter isWhite isMessenger />
                      )}
                      {/* <Link href={"/messaging/" + author.id}>
                          <button className="p-2  text-[#ffffff] focus-visible:ring-2 focus-visible:ring-[#ffffff] focus-visible:ring-offset-2 bg-transparent hover:border-[#ffffff] border  dark:text-[#ffffff] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors focus-visible:outline-none ">
                            Messaging {author.name}
                          </button>
                        </Link> */}
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {video && (
              <video
                src={video}
                controls
                // autoPlay
                className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
              />
            )}
            <IconsFooter />
          </div>
        </div>
      </div>
    </article>
  );
};
export default StoreCard;

