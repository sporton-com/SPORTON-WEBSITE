'use client'
import { fetchAllUser } from "@/lib/actions/user.actions";
import React, { useState,useEffect } from "react";
import UserCard from "../cards/UserCard";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sports } from "@/constants/icons";
const Search = () => {
  
  const [result, setResultU] = useState<string>(`{ "users": [], "isNext": false }`);
  const [show, setShow] = useState<boolean>(
    true
  );
  const [showC, setShowC] = useState<boolean>(
    true
  );
  let typeS='user'
  let resultU:{ users: any[]; isNext: boolean } =JSON.parse(result)
  let sportsLen=resultU.users.map((user) =>user?.sport)
  let handelOnFocus = async (e: string) => {
    // setShow(false)
  };
  
  let handelOnChange = async (e: string) => {
    try {
      if (typeS==='user') {
        if (e===''){

          setShow(true)
          setShowC(true)
        }else{
          setShow(false)
        }
          let result = await fetchAllUser({
            searchString:e,
            pageNum: 1,
            pageSize: 30,
          });
          if (result !== undefined) {
            setResultU(JSON.stringify(result));
          }
        
      }
    } catch (e: any) {
      console.log("faild to search", e);
    }
  };
  useEffect(()=>{
    handelOnChange('');
  },[])
  return (
    <section className="">
      <div className=" text-white">{typeS==='user'?'Search':'Communities'}</div>
      <div className="w-full mt-3">
        <Input
          placeholder="Enter name or username or sport"
          className=" account-form_input "
          onChange={(e) => handelOnChange(e.target.value)}
          onFocus={(e) => handelOnFocus(e.target.value)}
        />
      </div>
      {show&&<div className="mt-8">
        <Tabs defaultValue="" className="w-full">
        <TabsList className="grid grid-cols-3 gap-3 sm:grid-cols-6 h-auto p-3 justify-evenly">
  {sports.map((tab) => (
    (tab.label === "Football" || tab.label === "Running" || tab.label === "Tennis" || tab.label === "Basketball" || tab.label === "Swimming" || tab.label === "Karate") && (
      <TabsTrigger onClick={() => { setShowC(false) }} key={tab.label} value={tab.value} className="tab2 flex-col bg-[#ffffff]">
        <img
          src={tab.icon}
          alt={tab.label}
          className="object-contain max-sm:h-[3.645rem] max-sm:w-[3.645rem] h-32 w-32"
        />
        <p className="max-sm:hidden">{tab.label}</p>
        {/* <p className="rounded-full px-2 text-base-regular">
          {sportsLen.filter((s) => s === tab.value.split(" ")[0]).length}
        </p> */}
      </TabsTrigger>
    )
  ))}
</TabsList>

          {sports.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full mt-8 text-light-1">
              {resultU?.users.map((person: any) => person?.sport===tab.value.split(" ")[0] &&(
          <UserCard
          key={person.id}
          person={JSON.stringify(person)}
          />
          ))}
            </TabsContent>
          ))}
        </Tabs>
      </div> }
      {showC&&
    <div className={` mt-14 flex flex-1   ${'flex-col gap-9' }`}>
      
      {typeS==='user' ?(resultU?.users.length === 0 ? (
        <h1>no result</h1>
        ) : (
          resultU?.users.map((person: any) => (
          <UserCard
          key={person.id}
          person={JSON.stringify(person)}
          />
          ))
          )):null}
    </div>}
          </section>
  );
};

export default Search;
