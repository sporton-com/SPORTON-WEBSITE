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

interface Params {
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
}: Params) => {

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
      <div className="flex justify-center gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div onClick={copyToClipboard}>
                <Image
                  src={`/assets/copy.svg`}
                  alt="copy"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform cursor-pointer object-contain"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary-500">
              <p>Copy link</p>
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
                  alt="facebook"
                  height={40}
                  width={40}
                  className="hover:scale-110 transition-transform cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary-500">
              <p>Share on Facebook</p>
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
                  alt="twitter"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary-500">
              <p>Share on Twitter</p>
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
                  alt="whatsapp"
                  height={30}
                  width={30}
                  className="hover:scale-110 transition-transform cursor-pointer object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary-500">
              <p>Share on WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };
 
  

  let IconsFooter = ({
    isMessenger,
    isWhite,
  }: {
    isMessenger?: boolean;
    isWhite?: boolean;
  }) => (
    <div className="flex flex-col">
      <div className="mt-3 flex flex-row items-center gap-6">
        {!isMessenger && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/messaging/" + userId + "-" + author._id}>
                  <Image
                    src={`/assets/messnger${isWhite ? "-white" : ""}.svg`}
                    alt="messenger"
                    height={20}
                    width={20}
                    className="hover:scale-110 transition-transform cursor-pointer object-contain"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-primary-500">
                <p>Messaging {author.name}</p>
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
              className="hover:scale-110 transition-transform cursor-pointer object-contain"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="absolute right-5 top-5">
                <DrawerClose>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={`/assets/close.svg`}
                          alt="close"
                          height={30}
                          width={30}
                          className="hover:scale-110 transition-transform cursor-pointer object-contain"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-primary-500">
                        <p>Close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DrawerClose>
              </div>
              <div className="flex flex-col items-center gap-5">
                <DrawerTitle>It's Time to Share</DrawerTitle>
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={`/assets/points-virtical${isBlack ? "-white" : ""}.svg`}
          alt="points"
          height={5}
          width={5}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-2 text-white">
        <DropdownMenuItem>
          <Link href={"/profile/" + author.id} className="flex gap-2">
            <Image
              src={"/assets/edit.svg"}
              alt="edit"
              height={20}
              width={20}
            />
            <p>Edit Post</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <article className="flex w-full flex-col mb-10 rounded-xl bg-dark-2 p-5 shadow-lg transition-transform hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="text-white hidden flex-col items-center lg:flex">
            <Link href={"/profile/" + author.id} className="relative w-11 h-11">
              <div className="relative aspect-square h-10 w-10">
                <img
                  src={author.image}
                  alt={author.name}
                  className="absolute inset-0 w-full h-full rounded-full object-cover"
                />
              </div>
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="text-white flex flex-col gap-4 w-full">
            <div className="flex w-full flex-1 flex-row gap-4">
              <div className="flex w-full flex-col">
                <div className="flex justify-between gap-2">
                  <Link href={"/profile/" + author.id} className="text-xl font-semibold text-white">
                    {author.name}
                  </Link>
                  <IconsFooter />
                </div>
                <p className="text-gray-700 mt-1 text-sm">{content}</p>
                {image && (
                  <div className="relative w-full h-80 mt-4 rounded-lg">
                    <Image
                      src={image}
                      alt="post image"
                      layout="fill"
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                {video && (
                  <video
                    controls
                    className="w-full h-80 mt-4 rounded-lg"
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="flex w-full justify-between mt-3">
                  <p className="text-gray-500 text-xs">
                    {new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()}
                  </p>
                  <DropDown />
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoreCard;
