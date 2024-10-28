// components/FileMenu.tsx
import React, { useRef } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { IconFile, IconPhoto, IconUser, IconChartBar } from '@tabler/icons-react';

interface FileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  closeMenu: () => void;
  onFileUpload: (file: File) => void;
  onImageUpload: (file: File) => void;
}

const FileMenu: React.FC<FileMenuProps> = ({ anchorEl, open, closeMenu, onFileUpload, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    closeMenu();
    fileInputRef.current?.click();
  };

  const handleImageClick = () => {
    closeMenu();
    imageInputRef.current?.click();
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        <MenuItem onClick={handleFileClick}>
          <IconFile style={{ marginRight: 8 }} /> File
        </MenuItem>
        <MenuItem onClick={handleImageClick}>
          <IconPhoto style={{ marginRight: 8 }} /> Photos & Videos
        </MenuItem>
        <MenuItem onClick={() => alert('Contact selected')}>
          <IconUser style={{ marginRight: 8 }} /> Contact
        </MenuItem>
        <MenuItem onClick={() => alert('Poll selected')}>
          <IconChartBar style={{ marginRight: 8 }} /> Poll
        </MenuItem>
      </Menu>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileUpload(file);
        }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        ref={imageInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onImageUpload(file);
        }}
      />
    </>
  );
};

export default FileMenu;
