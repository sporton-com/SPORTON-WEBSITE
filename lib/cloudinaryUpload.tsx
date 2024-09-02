import { CldUploadWidget } from 'next-cloudinary';
import React from 'react'

const CloudinaryUpload = () => {
  return (
    <CldUploadWidget uploadPreset="sporton">
  {({ open }) => {
    return (
      <button className="button" onClick={() => open()}>
        Upload
      </button>
    );
  }}
</CldUploadWidget>
  )
}

export default CloudinaryUpload