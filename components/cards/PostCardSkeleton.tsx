import { Skeleton } from "../ui/skeleton";
import React from "react";

const PostCardSkeleton = ({ is }: { is?: boolean }) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className=" text-white hidden flex-col items-center lg:flex ">
          <Skeleton
            className={`h-[50px] relative ${
              is && " bg-[#877eff]"
            } w-[50px]  aspect-square rounded-full`}
          />
          <div className="thread-card_bar" />
        </div>
        <div className=" text-white flex flex-col gap-4 w-full  ">
          <div className="flex w-full flex-1 flex-row gap-4 ">
            <div className="flex w-full flex-1 flex-row gap-4 ">
              <div className=" text-white flex flex-col items-center lg:hidden ">
                <div className="relative w-11 h-11">
                  <Skeleton
                    className={`h-[50px] relative ${
                      is && " bg-[#877eff]"
                    } w-[50px]  aspect-square rounded-full`}
                  />
                </div>
                <div className="thread-card_bar" />
              </div>
              <div className="-translate-y-3">
                <div className=" cursor-pointer w-full flex gap-4 ">
                  <div className=" cursor-pointer w-full flex gap-[3px]">
                    <Skeleton
                      className={`h-[20px] ${is && " bg-[#877eff]"} w-[20px]`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Skeleton className={`h-[20px] ${is && " bg-[#877eff]"} w-[20px]`} />

          <div className="max-sm:px-0 px-16">
            <Skeleton
              className={` ${
                is && " bg-[#877eff]"
              } h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5`}
            />
          </div>

        </div>
      </div>
    </article>
  );
};

export default PostCardSkeleton;
