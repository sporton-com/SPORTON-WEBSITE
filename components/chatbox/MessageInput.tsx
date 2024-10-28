// components/MessageInput.tsx
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { IconPaperclip } from '@tabler/icons-react';
import FileMenu from './FileMenu';
import TextInput from './TextInput';
import ActionButtons from './ActionButtons';
import FullScreenImagePreview from './FullScreenImagePreview';

interface MessageInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleMessageSend: () => void;
  recording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  setInputValue,
  handleMessageSend,
  recording,
  startRecording,
  stopRecording,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
  };

  const handleImageUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setUploadedImage(fileUrl);
    setIsPreviewOpen(true); // Open the preview when an image is uploaded
    console.log('Image/Video uploaded:', file);
  };

  const handleCancelPreview = () => {
    setUploadedImage(null);
    setIsPreviewOpen(false);
  };

  const handleEditImage = (img:string) => {
    setUploadedImage(img)
  };

  return (
    <Box display="flex" alignItems="center" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 2 }}>
      <motion.div whileTap={{ scale: 0.9 }}>
        <IconButton onClick={openMenu} color="primary">
          <IconPaperclip className="text-primary-500"  />
        </IconButton>
      </motion.div>

      <FileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        closeMenu={closeMenu}
        onFileUpload={handleFileUpload}
        onImageUpload={handleImageUpload}
      />

      {uploadedImage && (
        <Box
          component="img"
          src={uploadedImage}
          alt="Uploaded preview"
          sx={{ width: 50, height: 50, borderRadius: 1, mr: 1 }}
        />
      )}

      <TextInput inputValue={inputValue} setInputValue={setInputValue} handleMessageSend={handleMessageSend} />
      <ActionButtons
        inputValue={inputValue}
        handleMessageSend={handleMessageSend}
        recording={recording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />

      {isPreviewOpen &&uploadedImage && (
        <FullScreenImagePreview
          imageUrl={uploadedImage}
          onCancel={handleCancelPreview}
          onEdit={handleEditImage}
        />
      )}
    </Box>
  );
};

export default MessageInput;
