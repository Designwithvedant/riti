
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageCapture: (imageData: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageCapture }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        onImageCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <input 
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {!image ? (
          <Button 
            onClick={handleCameraClick}
            variant="outline"
            className="h-40 w-full border-dashed flex flex-col items-center justify-center gap-2"
          >
            <Camera className="h-8 w-8" />
            <span>Take Photo or Upload Image</span>
          </Button>
        ) : (
          <Card className="relative overflow-hidden">
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 z-10" 
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={image} 
              alt="Proof" 
              className="max-h-96 w-auto" 
            />
          </Card>
        )}
      </div>
    </div>
  );
};
