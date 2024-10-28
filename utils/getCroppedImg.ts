interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation = 0 // إضافة معامل التدوير
  ): Promise<string | null> {
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
  
        // حساب عرض وارتفاع canvas بعد التدوير
        const radians = (rotation * Math.PI) / 180;
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));
  
        canvas.width = Math.floor(pixelCrop.width * cos + pixelCrop.height * sin);
        canvas.height = Math.floor(pixelCrop.width * sin + pixelCrop.height * cos);
  
        // ضبط المركز والتحريك للرسم بعد التدوير
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(radians);
  
        // رسم الصورة
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          -pixelCrop.width / 2,
          -pixelCrop.height / 2,
          pixelCrop.width,
          pixelCrop.height,
        );
  
        // تحويل النتيجة إلى Blob
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            resolve(croppedImageUrl);
          } else {
            resolve(null);
          }
        }, 'image/jpeg');
      };
  
      image.onerror = () => {
        reject(new Error('Failed to load the image'));
      };
    });
  }
  