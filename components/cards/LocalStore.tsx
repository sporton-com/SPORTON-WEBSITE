'use client'
import React,{useEffect} from 'react'
import { UserData } from '@/lib/actions/user.actions';
const LocalStore = (props:UserData) => {
    useEffect(() =>{
      props.image &&  localStorage.setItem("image",props.image)
      localStorage.setItem("id",props.id)
      localStorage.setItem('userInfo', JSON.stringify(props))
    },[props])
  return (
    <div></div>
  )
}

export default LocalStore