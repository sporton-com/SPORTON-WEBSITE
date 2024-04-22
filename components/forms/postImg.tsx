// 'use client'
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Image from "next/image"
// import { ChangeEvent, useState } from 'react'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
// import { UserValidation } from "@/lib/validations/user"
// export function DialogDemo() {
//   let form = useForm< z.infer<typeof UserValidation> >({
//     resolver:zodResolver(UserValidation),
//     defaultValues:{
//         profile_photo:userData?.image || '',
//         name:userData?.name ||'',
//         username:userData?.username ||'',
//         bio:userData?.bio ||'',
//     }
// });
//     const [files, setFiles] = useState<File[]>([])
//     function handleImageChange(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void) {
//         e.preventDefault();
//         let readfile= new FileReader()
//         if (e.target.files && e.target.files.length>0) {
//             const file=e.target.files[0];
//             setFiles(Array.from(e.target.files))
//             if (!file.type.includes('image')) return;
//             readfile.onload=async(e)=>{
//                 const imageDataUrl=e.target?.result?.toString()||'';
//                 fieldChange(imageDataUrl);
//             }
//             readfile.readAsDataURL(file);
            
//         }
//     }
//   return (

//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline"><Image src={'/assets/createimg.svg'} alt={''} height={30} width={30} className={'rounded-full object-contain'}/></Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//           <FormField
//           control={form.control}
//           name="profile_photo"
//           render={({ field }) => (
//             <FormItem className='  flex items-center gap-4'>
//               <FormLabel className='account-form_image-label'>
//                 {field.value?
//                 <Image 
//                 src={field.value}
//                 alt='profile_photo'
//                 width={96}
//                 height={96}
                
//                 priority
//                 className='rounded-full object-cover'
//                 />:
//                 <Image 
//                 className='rounded-full'
//                 src='/assets/profile.svg'
//                 alt='profile_photo'
//                 width={24}
//                 height={24}/>}
//               </FormLabel>
//               <FormControl className=' flex-1 text-base-semibold text-gray-200'>
//                 <Input type='file' accept='image/*' placeholder='upload a photo' className='account-form_image-input'
//                 onChange={(e)=>handleImageChange(e,field.onChange)} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//           />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input
//               id="username"
//               defaultValue="@peduarte"
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         </form>
//         </Form>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
