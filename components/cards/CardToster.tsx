import React from 'react';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CardToster = ({link,content,image,name}:{image:string,name:string,link:string,content:string}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-[#ffffff] shadow-lg rounded-lg overflow-hidden my-4"
    >
      <Link href={link} className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex-shrink-0">
            <FaEnvelope className="text-blue-500 text-2xl mr-4" />
          </div>
          <div className="flex-shrink-0">
            <img src={image} alt={name} className="w-12 h-12 rounded-full" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-900">New message from {name}</div>
            <p className="text-gray-600">{content}</p>
          </div>
      </Link>
    </motion.div>
  );
};

export default CardToster;
