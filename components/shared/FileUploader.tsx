"use client"
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";


type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  fileType:string;
  setFileType:any;
  name:string;
};

const FileUploader = ({ fieldChange, mediaUrl,setFileType,fileType,name }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

// Inside your component



useEffect(() => {
  // Create a new XMLHttpRequest
  
  function handleFileUrl(fileUrl:string) {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            if (blob.type.includes('video')) {
              setFileType('video');
                // Handle video file
            } else if (blob.type.includes('image')) {
              setFileType('image');
              // Handle image file
            } else {
              setFileType('');
                console.log('Unknown file type.');
            }
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

// Example of using the function

fileUrl?.length>0&& handleFileUrl(fileUrl);
}, [fileUrl]);

// Now you can render based on the fileType state





  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "video/*": [".mp4"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} name={name} className="cursor-pointer" />

      {fileUrl ? (
        <>
          {fileType === 'video' &&
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <video src={fileUrl} autoPlay controls className="h-72 lg:h-[300px] lg:w-4/5 w-full rounded-[24px] object-cover object-top"/>
            </div>}
          {fileType === 'image' && 
            <div className="flex flex-1 h-72 lg:h-[300px]   justify-center w-full p-5 lg:p-10" style={{height:'300px'}}>
             <img src={fileUrl} alt="" className="rounded-[24px] object-cover object-center" style={{height:'100%'}} />
          </div>}
          <p className="text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="flex flex-center items-center flex-col p-7 h-80  ">
          <img
            src="/assets/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo or video here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG, mp4 </p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;