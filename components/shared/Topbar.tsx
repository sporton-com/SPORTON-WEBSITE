'use client'
// import { OrganizationSwitcher } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
const Topbar = () => {
  let path=usePathname();
  let show=path.split('/').pop()==='new-post';
  // console.log(show,path.split('/'))
  const [image, setImage] = useState<string>()
  const [id, setId] = useState<string|undefined|null>('')
  useEffect(()=>{
    console.log("image")
    
      let et=setInterval(()=>{
      let image=sessionStorage.getItem("image")
    if(image){
      setImage(image)
      clearInterval(et)
    }
      },1000)
    setId(sessionStorage.getItem("id"))
  },[image,sessionStorage.getItem("image")])
  return (show?<></>:
    <section className='topbar'>
        <div className='container p-0'>
            <div className=' flex flex-row justify-between'>
                <Link href="/" className=' flex items-center justify-between w-1/12  g-3  no-underline text-body-bold text-white' >
                  
                  <div className="flex items-center  gap-9">
                  <div className=" max-sm:w-16 max-sm:h-16 w-20 h-20 relative ">
                  <Image src="/logo5.gif" alt='' fill  className=""  />
                    </div>
                  <p className='ms-2 text-[#FF971D] -translate-x-10'>SPORTON</p>
                    </div>
                  </Link>
                  <div className="flex items-center p-1 lg:gap-9 gap-2">
                  <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href={"/messaging/"} className="">
              <Image
                src={`/assets/messnger-primary.svg`}
                alt="repost"
                height={30}
                width={30}
                className="hover:scale-125 cursor-pointer object-contain"
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-primary-500">Go Messaging</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
                  {image&&
                  <Link href={"/profile/"+id} className=' p-0'>
                  <Image src={image} alt={''} height={40} width={40} className={'rounded-full object-contain'}/></Link>}
                    {/* <ModeToggle/> */}
                    </div>
            </div>
        </div>
    </section>
  )
}

export default Topbar