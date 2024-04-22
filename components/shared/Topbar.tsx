'use client'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { dark } from "@clerk/themes";
const Topbar = () => {
  let path=usePathname();
  let show=path.split('/').pop()==='new-post';
  console.log(show,path.split('/'))
  return (show?<></>:
    <section className='topbar'>
        <div className='container'>
            <div className=' flex flex-row justify-between'>
                <Link href="/" className=' flex items-center justify-between w-1/12  g-3  no-underline text-body-bold text-white' >
                  <Image src="/logo.svg" alt='' width={30} height={30} />
                  <p className=' max-md:hidden '>Rero</p></Link>
                <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
            </div>
        </div>
    </section>
  )
}

export default Topbar