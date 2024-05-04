'use client'
import React,{useEffect} from 'react'
const LocalStore = ({image,id}:{image:string|undefined,id:string}) => {
    useEffect(() =>{
        image &&  localStorage.setItem("image",image)
        localStorage.setItem("id",id)
    },[image,id])
  return (
    <div></div>
  )
}

export default LocalStore