import React, { useEffect } from 'react';

interface CroppedImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageUrl: string;
  text: string;
  textPosition: { x: number; y: number };
  stickers: { emoji: string; x: number; y: number; width: number; height: number }[];
}

const CroppedImage: React.FC<CroppedImageProps> = ({ canvasRef, imageUrl, text, textPosition, stickers }) => {
  const drawImage = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const originalImage = new Image();
    originalImage.src = imageUrl;

    originalImage.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

        // Draw the text with a background
        const textWidth = ctx.measureText(text).width;
        const textHeight = 30; // Adjust as needed
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Background color
        ctx.fillRect(textPosition.x, textPosition.y - textHeight, textWidth, textHeight);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(text, textPosition.x, textPosition.y);

        // Draw stickers (emojis)
        stickers.forEach((sticker) => {
          ctx.font = '2rem'; // Adjust size as needed
          ctx.fillText(sticker.emoji, sticker.x, sticker.y);
        });
      }
    };
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawImage(canvasRef.current);
    }
  }, [imageUrl, text, stickers, textPosition]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.8}
      style={{ borderRadius: '8px' }}
    />
  );
};

export default CroppedImage;
