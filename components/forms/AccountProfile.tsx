"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import Loader from "@/components/shared/Loader";
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
import { ChangeEvent, useRef, useState } from "react";
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
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface props {
  userData: {
    id: string | undefined;
    objectID: string | undefined;
    username: string | null | undefined;
    name: string;
    bio: string;
    sport: string;
    image: string | undefined;
    type: string | undefined;
    phone: string | undefined;
  };
}

let sports = [
  { en: "Football", ar: "كرة القدم" },
  { en: "Running", ar: "الجري" },
  { en: "Tennis", ar: "التنس" },
  { en: "Basketball", ar: "كرة السلة" },
  { en: "Swimming", ar: "السباحة" },
  { en: "Karate", ar: "الكاراتيه" },
  { en: "Diving", ar: "الغوص" },
  { en: "Fitness", ar: "اللياقة البدنية" },
  { en: "Horse Riding", ar: "ركوب الخيل" },
  { en: "Cycling", ar: "ركوب الدراجات" },
  { en: "Skating", ar: "التزلج" },
  { en: "Handball", ar: "كرة اليد" },
  { en: "Golf", ar: "الجولف" },
  { en: "Hockey", ar: "الهوكي" },
  { en: "Chess", ar: "الشطرنج" },
  { en: "kung Fu", ar: "الكونغ فو" },
  { en: "Boxing", ar: "الملاكمة" },
  { en: "Bowling", ar: "البولينج" },
];

const AccountProfile = ({ userData }: props) => {
  let pathname = usePathname();
  let router = useRouter();
  let { startUpload } = useUploadThing("mediaPost");
  const [files, setFiles] = useState<File[]>([]);
  const [Type, setType] = useState<string>("player");
  const [Username, setUsername] = useState<string>(
    userData?.username ? userData.username : ""
  );
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [imageOptionsVisible, setImageOptionsVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement|null>(null);
  let form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: userData?.image || "",
      name: userData?.name || "",
      username: userData?.username || "",
      bio: userData?.bio || "",
      sport: userData.sport || "",
      type: userData.type || "player",
      phone: userData.phone || "",
    },
  });

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
    setIsLoadingCreate(true);
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
      });
      if (pathname.includes("/profile/edit")) {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log("failed to update user:", error);
    }
  }

  const handleOptionSelect = (option: 'view' | 'upload') => {
    if (option === 'view') {
      setImageOptionsVisible(false);
      // هنا يمكنك إضافة الكود لعرض الصورة في نافذة جديدة أو أي طريقة أخرى تريدها
      window.open(form.getValues("profile_photo"), '_blank');
    } else if (option === 'upload') {
      setImageOptionsVisible(false);
      fileInputRef && fileInputRef.current && fileInputRef.current.click();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full ">
      <FormField
      control={form.control}
      name="profile_photo"
      render={({ field }) => (
        <FormItem className="flex  justify-center gap-1">
          <FormLabel className="account-form_image-label">
          <div className="relative aspect-square h-[96px] w-[96px]">
            {field.value ? (
               <img
               src={field.value}
               alt={"profile_photo"}
               className="absolute inset-0 w-full h-full rounded-full object-cover"/>
              // <Image
              //   src={field.value}
              //   alt="profile_photo"
              //   width={96}
              //   height={96}
              //   priority
              //   className="rounded-full object-cover"
              //   />
              ) : (
                <img
                src={"/assets/profile.svg"}
                alt={"/assets/profile.svg"}
                className="absolute inset-0 w-full h-full rounded-full object-cover"
              />
                // <Image
                // className="rounded-full max-h-[24px] max-w-[24px]"
                // src="/assets/profile.svg"
                // alt="profile_photo"
                // width={24}
                // height={24}
                // />
              )}
              </div>
          </FormLabel>
          
          {/* زر "Edit" مع أيقونة */}
          {/* <CloudinaryUpload/> */}
          <div
            onMouseOver={() => setImageOptionsVisible(true)} // toggle visibility
            onMouseOut={() => setImageOptionsVisible(false)} // toggle visibility
            className="mt-2 relative bg-blue-500 text-white rounded px-4 py-2 flex items-center gap-2 transition-colors duration-200 hover:bg-blue-700" // تأثير hover
          >
            <Image
                src="/assets/edit.svg"
                alt="edit"
                className=""
                width={24}
                height={24}
              /> 

          {imageOptionsVisible && (
            <div className="absolute bg-[#ffffff] flex flex-col items-center translate-x-[50%] w-32 shadow-lg rounded-lg p-2">
              <button 
                onClick={() => handleOptionSelect('view')} 
                className="block text-gray-800 hover:bg-gray-200 p-2 rounded"
              >
                عرض الصورة
              </button>
              <button 
                onClick={() => handleOptionSelect('upload')} 
                className="block text-gray-800 hover:bg-gray-200 p-2 rounded"
                >
                تحميل صورة
              </button>
            </div>
          )}
          </div>

          <FormControl className="flex-1 text-base-semibold text-gray-200">
            <Input
              type="file"
              ref={fileInputRef} // ربط الـ ref هنا
              accept="image/*"
              placeholder="تحميل صورة"
              className="account-form_image-input hidden"
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
              <RadioGroup
                className="flex justify-center flex-row-reverse"
                onChange={(e: any) => {
                  field.onChange(e);
                  setType(e.target?.value);
                }}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                disabled={field.disabled}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"player"} id="option-one" />
                  <Label htmlFor="option-one">لاعب</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"coach"} id="option-onee" />
                  <Label htmlFor="option-onee">مدرب</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"agent"} id="option-two" />
                  <Label htmlFor="option-two">وكيل</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"club"} id="option-three" />
                  <Label htmlFor="option-three">نادي</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"company"} id="option-four" />
                  <Label htmlFor="option-four">شركة</Label>
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
              <FormControl>
                <Input
                  placeholder={`ادخل اسم ${Type === "club" ? "النادي" : Type === "company" ? "الشركة" : "كامل"}`}
                  className=" account-form_input"
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    (Type === "company" || Type === "club") && setUsername(e.target.value);
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
              <FormControl>
                <Input
                  placeholder="ادخل اسم المستخدم"
                  name={field.name}
                  className=" account-form_input"
                  // disabled={Type === "company" || Type === "club"}
                  value={
                    Type === "company" || Type === "club" ? Username : field.value
                  }
                  onChange={(e) => field.onChange(e)}
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
              <PhoneInput
                placeholder="رقم الهاتف"
                className="account-form_input px-2 py-2 rounded-md gap-3"
                value={field.value}
                defaultCountry="EG"
                onBlur={field.onBlur}
                onChange={(value) => field.onChange(value ? value : "")}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`اكتب نبذة عن${
                    Type === "club" ? " النادي" : Type === "company" ? " الشركة" : "ك"
                  }`}
                  className="account-form_input h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <FormItem>
              <Label>اختر رياضتك</Label>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || sports[0].ar}
              >
                <FormControl>
                  <SelectTrigger className="account-form_input">
                    <SelectValue className="flex flex-row gap-5" defaultValue={field.value} placeholder={` اختار رياضتك المفضلة `} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="account-form_input">
                  <SelectGroup>
                    <SelectLabel>اختر رياضتك</SelectLabel>
                    {sports.map((item, index) => (
                      <SelectItem key={index} value={item.en}>
                        <div className="flex gap-5" >
                         <Image src={'/'+item.en.split(' ')[0]+".svg"} alt={item.ar}  height={30} width={30}/> 
                        {item.ar}
                      </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full flex justify-center gap-5  bg-primary-500 hover:bg-primary-500/80 focus:bg-primary-500/80">
          تحديث الملف الشخصي
        {isLoadingCreate && <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;

// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserValidation } from "@/lib/validations/user";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import * as z from "zod";
// import Image from "next/image";
// import { ChangeEvent, useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { isBase64Image } from "@/lib/utils";
// import { useUploadThing } from "@/uploadthing";
// import { updateUser } from "@/lib/actions/user.actions";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroupItem,RadioGroup} from "../ui/radio-group";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import cloudinaryUpload from '../../lib/cloudinaryUpload';
import CloudinaryUpload from "../../lib/cloudinaryUpload";

// interface props {
//   userData: {
//     id: string | undefined;
//     objectID: string | undefined;
//     username: string | null | undefined;
//     name: string;
//     bio: string;
//     sport: string ;
//     image: string | undefined;
//     type: string|undefined;
//     phone: string|undefined;
//   };
// }
// let sports=[
//   "Football",
// "Running",
// "Tennis",
// "Basketball",
// "Swimming",
// "Karate",
// "Diving",
// "Fitness",
// "Horse Riding",
// "Cycling",
// "Skating",
// "Handball",
// "Golf",
// "Hockey",
// "Chess",
// "kung Fu",
// "Boxing",
// "Bowling",
// ]
// const AccountProfile = ({ userData }: props) => {
//   let pathname = usePathname();
//   let router = useRouter();
//   let { startUpload } = useUploadThing("mediaPost");
//   const [files, setFiles] = useState<File[]>([]);
//   const [Type, setType] = useState<string>('player');
//   const [Username, setUsername] = useState<string>(userData?.username?userData.username:'');
//   let form = useForm<z.infer<typeof UserValidation>>({
//     resolver: zodResolver(UserValidation),
//     defaultValues: {
//       profile_photo: userData?.image || "",
//       name: userData?.name || "",
//       username: userData?.username ||'',
//       bio: userData?.bio || "",
//       sport: userData.sport ||"",
//       type: userData.type ||"player",
//       phone: userData.phone ||"",
//     },
//   });
//   console.log(userData.phone)
//   function handleImageChange(
//     e: ChangeEvent<HTMLInputElement>,
//     fieldChange: (value: string) => void
//   ) {
//     e.preventDefault();
//     let readfile = new FileReader();
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setFiles(Array.from(e.target.files));
//       if (!file.type.includes("image")) return;
//       readfile.onload = async (e) => {
//         const imageDataUrl = e.target?.result?.toString() || "";
//         fieldChange(imageDataUrl);
//       };
//       readfile.readAsDataURL(file);
//     }
//   }
//   async function onSubmit(values: z.infer<typeof UserValidation>) {


//     try {
//       console.log("Submit update user ");
//       const blob = values.profile_photo;
//       const hasImage = isBase64Image(blob);
//       if (hasImage) {
//         const imageRes = await startUpload(files);
//         if (imageRes && imageRes[0].fileUrl) {
//           values.profile_photo = imageRes[0].fileUrl;
//         }
//       }
//          await updateUser({
//             userId: userData.id,
//             username: values.username,
//             name: values.name,
//             bio: values.bio,
//             sport: values.sport,
//             image: values.profile_photo,
//             type: values.type,
//             phone: values.phone,
//             path: pathname,
//           })
//       if (pathname.includes("/profile/edit")) {
//         console.log("Submit update user ");
//         router.back();
//       } else {
//         router.push("/");
//       }
//     } catch (error: any) {
//       console.log("faild to update user:", error);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="profile_photo"
//           render={({ field }) => (
//             <FormItem className="  flex items-center gap-4">
//               <FormLabel className="account-form_image-label">
//                 {field.value ? (
//                   <Image
//                     src={field.value}
//                     alt="profile_photo"
//                     width={96}
//                     height={96}
//                     priority
//                     className="rounded-full object-cover"
//                   />
//                 ) : (
//                   <Image
//                     className="rounded-full max-h-[24px] max-w-[24px]"
//                     src="/assets/profile.svg"
//                     alt="profile_photo"
//                     width={24}
//                     height={24}
//                   />
//                 )}
//               </FormLabel>
//               <FormControl className=" flex-1 text-base-semibold text-gray-200">
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   placeholder="upload a photo"
//                   className="account-form_image-input"
//                   onChange={(e) => handleImageChange(e, field.onChange)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem>
//             <RadioGroup className="flex" onChange={(e:any)=>{
//               field.onChange(e)
//               setType(e.target?.value)
//             }} name={field.name} onBlur={field.onBlur} ref={field.ref} disabled={field.disabled} defaultValue={field.value}>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'player'} id="option-one" />
//     <Label htmlFor="option-one">Player</Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'coach'} id="option-onee" />
//     <Label htmlFor="option-onee">Coach</Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'agent'} id="option-two"/>
//     <Label htmlFor="option-two">Agent</Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'club'} id="option-three"/>
//     <Label htmlFor="option-three">Club</Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'company'} id="option-four"/>
//     <Label htmlFor="option-four">Company</Label>
//   </div>
// </RadioGroup>
// </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel className=' text-white'>Name</FormLabel> */}
//               <FormControl>
//                 <Input
//                   placeholder={`Enter your ${Type==='club'?'Club':Type==='company'?'Company':''} name`}
//                   className=" account-form_input"
//                   name={field.name} disabled={field.disabled}  value={field.value}
//                   onChange={e=>{
//                     field.onChange(e);
//                     (Type==='company'||Type==='club')&&setUsername(e.target.value)
//                   }}
//                   />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//           />
//           <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel className=' text-white'>Username</FormLabel> */}
//               <FormControl>
//                 <Input
//                   placeholder="Enter your username"
//                   name={field.name} disabled={field.disabled}  value={(Type==='company'||Type==='club')&&Username?Username.toLowerCase():field.value}
//                   onChange={e=>{
//                     field.onChange(e);
//                     (Type==='company'||Type==='club')&&setUsername(e.target.value)
//                   }}
//                   className="account-form_input"
//                 />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel className=' text-white'>Name</FormLabel> */}
//               <FormControl>
//               <PhoneInput
            
//                   className={`account-form_input px-2 bg-gray-100 w-full outline-none border rounded-lg h-10 relative transition-all `}
//                   name={field.name} disabled={field.disabled}  value={field.value}
//                   onChange={e=>{
//                     field.onChange(e);
//                   }}       />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//           />
        
//         <FormField
//           control={form.control}
//           name="bio"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel className=' text-white'>bio</FormLabel> */}
//               <FormControl>
//                 <Textarea
//                   placeholder="Enter your bio"
//                   rows={3}
//                   {...field}
//                   className="account-form_input"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {Type==='player'||Type==="coach"?
//         <FormField
//           control={form.control}
//           name="sport"
//           render={({ field }) => (
//             <Select name={field.name} disabled={field.disabled}  onValueChange={field.onChange}   defaultValue={field.value}>
//               <SelectTrigger className=" account-form_input">
//                 <SelectValue className="flex flex-row gap-5" placeholder="Select your sport" />
//               </SelectTrigger>
//               <SelectContent className="account-form_input">
//                 <SelectGroup>
//                   <SelectLabel>Select your sport</SelectLabel>
//                   {sports.map(e=>
//                   <SelectItem  key={e} value={e}>
//                     <div className="flex gap-5" >
//                     <Image src={'/'+e.split(' ')[0]+".svg"} alt={e}  height={30} width={30}/> {e}
//                     </div>
//                     </SelectItem>
//                   )}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           )}
//         />:<FormField
//         control={form.control}
//         name="sport"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 type="hidden"
//                 name={field.name} disabled={field.disabled}  value={Type}
//               />
//             </FormControl>

//             <FormMessage />
//           </FormItem>
//         )}
//       />}
//         <Button type="submit" className=" bg-primary-500">
//           Submit
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default AccountProfile;
