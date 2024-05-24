'use client'
import React,{useEffect} from 'react'
import { UserData } from '@/lib/actions/user.actions';
const LocalStore = (props:UserData) => {
    useEffect(() =>{
      props.image &&  sessionStorage.setItem("image",props.image)
      sessionStorage.setItem("id",props.id)
      sessionStorage.setItem('userInfo', JSON.stringify(props))
    },[props])
  return (
    <div></div>
  )
}

export default LocalStore