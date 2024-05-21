'use client'

import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boosting",
};
const Page = () => {
  const [first, setValue] = useState<number>()
  const [first2, setValue2] = useState<number>()
  const [NextB, setNextB] = useState<boolean>(true)
  const [IsEr, setEr] = useState<boolean>(false)
  let handelNext=(e:boolean)=>{
    setNextB(e)
  }
  return (<div className="">
    {/* <div className="mb-10">Boosting Profile</div> */}
    <div className=" flex justify-center"><h2 className="text-body-bold  px-4 py-1">Boosting Profile</h2></div>
    {NextB?<>
    <div className=" flex justify-center"><h3 className="border-primary-500 border-2 text-[#ffffff] rounded-full bg-primary-500 px-4 py-1">Budget | Duration</h3></div>
          <div className="flex flex-col gap-3">
          <h3 className=" text-body-bold text-primary-500">Budget </h3>
          <h3 className=" text-body-bold text-secondary-500">{first?first:0} L.E daily </h3>
           <Slider defaultValue={[0]} value={[first?first:0]} max={2000} step={1} onValueChange={e=>setValue(+e)} />
           <div className="flex gap-3 items-center">

           <Input
                  type="number"
                  placeholder="TYPE YOUR BADGET HERE"
                  className="account-form_input"
                  style={{width:'300px !important'}}
                  defaultValue={''}
                  value={first}
                  onChange={(e) => setValue(+e.target.value)}
                  />
                  <p className="grow text-body-bold">L.E</p>
                  </div>
          </div>
          <div className="flex flex-col gap-3 mt-1">
          <h3 className=" text-body-bold text-primary-500">Duration </h3>
          <h3 className=" text-body-bold text-secondary-500">{first2?first2:0} Day</h3>
           <Slider defaultValue={[0]} value={[first2?first2:0]} max={40} step={1} onValueChange={e=>setValue2(+e)} />
           <div className="flex gap-3 items-center">

           <Input
                  type="number"
                  placeholder="TYPE YOUR BADGET HERE"
                  className="account-form_input"
                  style={{width:'300px !important'}}
                  defaultValue={''}
                  value={first2}
                  onChange={(e) => setValue(+e.target.value)}
                  />
                  <p className="grow text-body-bold">Day</p>
                  </div>
          </div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-primary-500 px-4 py-1">Total spend</h2></div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-secondary-500 px-4 py-1">{first&&first2?first*first2:0} L.E over {first2?first2:0} Day</h2></div>
          <div className=" flex justify-center"><h2 className="text-body-bold  text-primary-500 px-4 py-1">Reach</h2></div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-secondary-500 px-4 py-1">{first&&first!==0?first2?first2*1000:0:0} - {first&&first!==0?first2?(first2*1000)+(first2/first2)*1600:0:0} Followars</h2></div>
          <div className=" mt-3 flex justify-center">
          <button onClick={()=>first&&first2?handelNext(false):setEr(true)} className="text-primary-500 flex  px-4 py-1 border-primary-500 border-2  rounded-full hover:opacity-75 gap-4 text-body-bold">
              <Image
                src="/assets/boosting.svg"
                alt="create post"
                className="rotate-90"
                width={24}
                height={24}
                />
          Next Boosting</button>
                </div>
          <div className=" flex justify-center"><p className={` text-[#c3282b] px-4 py-1 ${IsEr?'opacity-100':'opacity-0'}`}>Please select Budget and Duration</p></div>
                </>:<>
                <div className=" flex justify-center"><h3 className="border-primary-500 border-2 text-[#ffffff] rounded-full bg-primary-500 px-4 py-1">REVIEW YOUR AD</h3></div>
                <div className="flex flex-col gap-2">
          <h3 className=" text-body-bold text-primary-500">Goal </h3>
          <h2 className=" text-body-medium text-secondary-500">increasing profile visits</h2>
          <h3 className=" text-body-bold text-primary-500">Audience </h3>
          <h2 className=" text-body-medium text-secondary-500">Automatic</h2>
          <h3 className=" text-body-bold text-primary-500">Budget | Duration </h3>
          <h2 className=" text-body-medium text-secondary-500">{first?first:0} L.E | {first2?first2:0} Day</h2>
          <h3 className=" text-body-bold text-primary-500">Payment </h3>
          <h2 className=" text-body-medium text-gray-1">Add payment method</h2>
          <div className="flex justify-evenly">
          <img
                src="/assets/fawry.jpeg"
                alt="fawry"
                className="rounded-lg shadow object-contain h-24 w-32 max-sm:w-16 hover:outline-offset-2 hover:outline hover:outline-2  hover:outline-primary-500 max-sm:h-16 bg-[#ffd227]"
                />
          <img
                src="/assets/etisalat_cash.webp"
                alt="etisalat_cash"
                className="rounded-lg shadow object-contain h-24 w-32 max-sm:w-16 hover:outline-offset-2 hover:outline hover:outline-2  hover:outline-primary-500 max-sm:h-16 bg-black"
                
                />
          <img
                src="/assets/instaPay.webp"
                alt="fawry"
                className="rounded-lg shadow h-24 w-32 max-sm:w-16 max-sm:h-16 object-contain hover:outline-offset-2 hover:outline hover:outline-2  hover:outline-primary-500 "
                
                />
          <img
                src="/assets/VodCash.jpeg"
                alt="fawry"
                className="rounded-lg shadow h-24 w-32 max-sm:w-16 max-sm:h-16 object-contain bg-[#c3282b] hover:outline-offset-2 hover:outline hover:outline-2  hover:outline-primary-500"
                
                />
          </div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-secondary-500  px-4 py-1">Summarry</h2></div>
                <div className="max-sm:flex-col flex  justify-center max-sm:justify-between">
                <div className="flex max-sm:justify-between">
                <div className=" flex justify-center"><h2 className="text-body-bold text-primary-500 px-4 py-1">AD Budget</h2></div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-secondary-500 px-4 py-1">{first?first:0} L.E </h2></div>
                </div>
                <div className="flex max-sm:justify-between">
                <div className=" flex justify-center"><h2 className="text-body-bold text-primary-500 px-4 py-1">Total Cost</h2></div>
          <div className=" flex justify-center"><h2 className="text-body-bold text-secondary-500 px-4 py-1">{first&&first2?first*first2:0} L.E</h2></div>
                </div>
                </div>
                <div className=" mt-3 flex gap-3 justify-center">
                <button onClick={()=>handelNext(true)} className="text-primary-500 flex  px-4 py-1 border-primary-500 border-2  rounded-full hover:opacity-75 gap-4 text-body-bold">
              <Image
                src="/assets/boosting.svg"
                alt="create post"
                className="-rotate-90"
                width={24}
                height={24}
                />
          Back</button>
          <button onClick={()=>handelNext(false)} className="text-primary-500 flex  px-4 py-1 border-primary-500 border-2  rounded-full hover:opacity-75 gap-4 text-body-bold">
              <Image
                src="/assets/boosting.svg"
                alt="create post"
                className=""
                width={24}
                height={24}
                />
           BOOST <Image
                src="/assets/boosting.svg"
                alt="create post"
                className=""
                width={24}
                height={24}
                /></button>
                </div>
                </div>
                </>}
                </div>
  );
};

export default Page;
