"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupItem,RadioGroup} from "../ui/radio-group";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/types.cjs";
interface props {
  userData: {
    id: string | undefined;
    objectID: string | undefined;
    username: string | null | undefined;
    name: string;
    bio: string;
    sport: string ;
    image: string | undefined;
    type: string|undefined;
    phone: string|undefined;
  };
}
let sports=[
  "Football",
"Running",
"Tennis",
"Basketball",
"Swimming",
"Karate",
"Diving",
"Fitness",
"Horse Riding",
"Cycling",
"Skating",
"Handball",
"Golf",
"Hockey",
"Chess",
"kung Fu",
"Boxing",
"Bowling",
]
const AccountProfile = ({ userData }: props) => {
  let pathname = usePathname();
  let router = useRouter();
  let { startUpload } = useUploadThing("mediaPost");
  const [files, setFiles] = useState<File[]>([]);
  const [Type, setType] = useState<string>('player');
  const [Username, setUsername] = useState<string>(userData?.username?userData.username:'');
  let form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: userData?.image || "",
      name: userData?.name || "",
      username: userData?.username ||'',
      bio: userData?.bio || "",
      sport: userData.sport ||"",
      type: userData.type ||"player",
      phone: userData.phone ||"",
    },
  });
  console.log(userData.phone)
  function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    let readfile = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      readfile.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      readfile.readAsDataURL(file);
    }
  }
  async function onSubmit(values: z.infer<typeof UserValidation>) {


    try {
      console.log("Submit update user ");
      const blob = values.profile_photo;
      const hasImage = isBase64Image(blob);
      if (hasImage) {
        const imageRes = await startUpload(files);
        if (imageRes && imageRes[0].fileUrl) {
          values.profile_photo = imageRes[0].fileUrl;
        }
      }
         await updateUser({
            userId: userData.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            sport: values.sport,
            image: values.profile_photo,
            type: values.type,
            phone: values.phone,
            path: pathname,
          })
      if (pathname.includes("/profile/edit")) {
        console.log("Submit update user ");
        router.back();
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log("faild to update user:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="  flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    className="rounded-full max-h-[24px] max-w-[24px]"
                    src="/assets/profile.svg"
                    alt="profile_photo"
                    width={24}
                    height={24}
                  />
                )}
              </FormLabel>
              <FormControl className=" flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
            <RadioGroup className="flex" onChange={(e:any)=>{
              field.onChange(e)
              setType(e.target?.value)
            }} name={field.name} onBlur={field.onBlur} ref={field.ref} disabled={field.disabled} defaultValue={field.value}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={'player'} id="option-one" />
    <Label htmlFor="option-one">Player</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={'agent'} id="option-two"/>
    <Label htmlFor="option-two">Agent</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={'club'} id="option-three"/>
    <Label htmlFor="option-three">Club</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={'company'} id="option-four"/>
    <Label htmlFor="option-four">Company</Label>
  </div>
</RadioGroup>
</FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
                <Input
                  placeholder={`Enter your ${Type==='club'?'Club':Type==='company'?'Company':''} name`}
                  className=" account-form_input"
                  name={field.name} disabled={field.disabled}  value={field.value}
                  onChange={e=>{
                    field.onChange(e);
                    (Type==='company'||Type==='club')&&setUsername(e.target.value)
                  }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className=' text-white'>Username</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  name={field.name} disabled={field.disabled}  value={(Type==='company'||Type==='club')&&Username?Username.toLowerCase():field.value}
                  onChange={e=>{
                    field.onChange(e);
                    (Type==='company'||Type==='club')&&setUsername(e.target.value)
                  }}
                  className="account-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className=' text-white'>Name</FormLabel> */}
              <FormControl>
              <PhoneInput
            
                  className={`account-form_input px-2 bg-gray-100 w-full outline-none border rounded-lg h-10 relative transition-all `}
                  name={field.name} disabled={field.disabled}  value={field.value}
                  onChange={e=>{
                    field.onChange(e);
                  }}       />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className=' text-white'>bio</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder="Enter your bio"
                  rows={3}
                  {...field}
                  className="account-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {Type==='player'?
        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <Select name={field.name} disabled={field.disabled}  onValueChange={field.onChange}   defaultValue={field.value}>
              <SelectTrigger className=" account-form_input">
                <SelectValue className="flex flex-row gap-5" placeholder="Select your sport" />
              </SelectTrigger>
              <SelectContent className="account-form_input">
                <SelectGroup>
                  <SelectLabel>Select your sport</SelectLabel>
                  {sports.map(e=>
                  <SelectItem  key={e} value={e}>
                    <div className="flex gap-5" >
                    <Image src={'/'+e.split(' ')[0]+".svg"} alt={e}  height={30} width={30}/> {e}
                    </div>
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />:<FormField
        control={form.control}
        name="sport"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="hidden"
                name={field.name} disabled={field.disabled}  value={Type}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />}
        <Button type="submit" className=" bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
