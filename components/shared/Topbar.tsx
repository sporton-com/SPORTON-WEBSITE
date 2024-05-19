'use client'
// import { OrganizationSwitcher } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { dark } from "@clerk/themes";
import { useEffect, useState } from 'react';
import ModeToggle from '@/components/shared/ToggleMode'
const Topbar = () => {
  let path=usePathname();
  let show=path.split('/').pop()==='new-post';
  // console.log(show,path.split('/'))
  const [image, setImage] = useState<string|undefined|null>('')
  const [id, setId] = useState<string|undefined|null>('')
  useEffect(()=>{

    setImage(localStorage.getItem("image"))
    setId(localStorage.getItem("id"))
  },[image])
  return (show?<></>:
    <section className='topbar'>
        <div className='container'>
            <div className=' flex flex-row justify-between'>
                <Link href="/" className=' flex items-center justify-between w-1/12  g-3  no-underline text-body-bold text-white' >
                  
                  <Image src="/logo5.gif" alt='' width={80} height={80} className=""  />
                  {/* <p className='ms-2 max-md:hidden'> SPORTON</p> */}
                  </Link>
                  <div className="flex p-1 gap-9">
                    
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