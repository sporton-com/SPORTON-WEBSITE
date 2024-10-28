import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { IconX, IconEdit, IconCrop, IconRotate } from '@tabler/icons-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/getCroppedImg';
import DraggableText from './DraggableText';
import EmojiPicker from './EmojiPicker';
import AspectRatioSelector from './AspectRatioSelector';
import TextInput from './TextInputImage';
import CroppedImage from './CroppedImage';
import { ResizableBox } from 'react-resizable';
import { IconMoodPlus } from '@tabler/icons-react';
interface FullScreenImagePreviewProps {
  imageUrl: string;
  onCancel: () => void;
  onEdit: (croppedImage: string) => void;
}

const FullScreenImagePreview: React.FC<FullScreenImagePreviewProps> = ({ imageUrl, onCancel, onEdit }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number } | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [text, setText] = useState<string>('');
  const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [stickers, setStickers] = useState<{ emoji: string; x: number; y: number; width: number; height: number }[]>([]);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onCropChange = useCallback((newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  }, []);

  const onCropComplete = useCallback((croppedArea: any, newCroppedAreaPixels: { width: number; height: number; x: number; y: number }) => {
    setCroppedAreaPixels(newCroppedAreaPixels);
  }, []);

  const addSticker = (emoji: { id: string; name: string; native: string }) => {
    setStickers((prev) => [...prev, { emoji: emoji.native, x: 50, y: 50, width: 50, height: 50 }]);
    setEmojiPickerVisible(false);
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
      onEdit(croppedImage!);
    }
  };

  const handleTextDrag = (newPosition: { x: number; y: number }) => {
    setTextPosition(newPosition);
  };
  useEffect(() => {
    const handleRotateOrZoom = async () => {
      if (croppedAreaPixels) {
        // استدعاء getCroppedImg مع أبعاد croppedAreaPixels الحالية
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
        onEdit(croppedImage!);
      } else {
        // إذا لم تكن croppedAreaPixels متاحة، يمكن استدعاء getCroppedImg مع أبعاد الصورة الأصلية
        const originalImage = new Image();
        originalImage.src = imageUrl;
  
        originalImage.onload = async () => {
          const originalPixels = {
            width: originalImage.width,
            height: originalImage.height,
            x: 0,
            y: 0,
          };
          const croppedImage = await getCroppedImg(imageUrl, originalPixels, rotation);
          onEdit(croppedImage!);
        };
      }
    };
  
    handleRotateOrZoom();
  }, [rotation]);
  return (
    <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3000,
      bgcolor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
        <IconX />
      </IconButton>
      <IconButton onClick={() => setIsCropping(!isCropping)} sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}>
        <IconCrop />
      </IconButton>
      <IconButton onClick={handleSave} sx={{ position: 'absolute', top: 20, right: 80, color: 'white' }}>
        <IconEdit />
      </IconButton>
      <IconButton onClick={() => setRotation((prev) => prev + 90)} sx={{ position: 'absolute', top: 20, right: 140, color: 'white' }}>
        <IconRotate />
      </IconButton>
      <IconButton onClick={() => setEmojiPickerVisible((prev) => !prev)} sx={{ position: 'absolute', top: 20, right: 200, color: 'white' }}>
      <IconMoodPlus />
    </IconButton>
      {isCropping ? (
        <>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          aspect={aspect}
          />
            <Box sx={{ position: 'absolute', top: 20, right: 300, color: 'white' }}>

<AspectRatioSelector aspect={aspect} setAspect={setAspect} />
</Box>
          </>
      ) : (
        <CroppedImage
          canvasRef={canvasRef}
          imageUrl={imageUrl}
          text={text}
          textPosition={textPosition}
          stickers={stickers}
        />
      )}

  <Box sx={{ position: 'absolute', top: 20, right: 240, color: 'white' }}>
      <TextInput text={text} setText={setText}  />
</Box>
      <EmojiPicker visible={emojiPickerVisible} addSticker={addSticker} />

      {text && (
        <DraggableText
          text={text}
          position={textPosition}
          onDrag={handleTextDrag}
        />
      )}
    </Box>
  );
};

export default FullScreenImagePreview;
