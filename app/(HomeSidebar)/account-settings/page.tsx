"use client";

import { useGetImage } from "@/hook/useGetImage";
import { Button, Label, Input } from "@/components";
import { Camera, X } from "lucide-react";

const AccountSettings = () => {
  const {
    fileInputRef,
    previewLink,
    uploading,
    isDragging,
    openBrowse,
    handleFileSelect,
    handleDrop,
    deleteImage,
    setIsDragging,
  } = useGetImage({
    onUpload: (url: string) => {},
  });
  return (
    <div>
      <h2 className="font-semibold text-2xl">My account</h2>
      <form action="">
        <div className="flex flex-col gap-3">
          <Label htmlFor="avatarImage" className="text-sm font-medium">
            Add photo
          </Label>
          <Input
            hidden
            id="avatarImage"
            name="avatarImage"
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <div
            className={`rounded-full flex justify-center items-center w-40 h-40 border-2 border-dashed cursor-pointer ${
              isDragging ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={openBrowse}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            {previewLink ? (
              <div className="relative w-full h-full">
                <img
                  src={previewLink}
                  alt="Preview"
                  className="rounded-full object-cover w-40 h-40"
                />
                <Button
                  className="absolute top-0 right-0 bg-accent text-black w-5 h-5 rounded-full"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteImage();
                  }}
                  type="button"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <Camera className="text-gray-500" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
