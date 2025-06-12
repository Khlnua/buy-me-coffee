"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetImage } from "@/hook/useGetImage";
import { uploadToCloudinary } from "@/utils/get-image-url";
import { useUser } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-label";
import { Camera, Coffee, X } from "lucide-react";

const ViewPage = () => {
  const {
    fileInputRef,
    previewLink,
    isDragging,
    openBrowse,
    handleFileSelect,
    handleDrop,
    deleteImage,
    setIsDragging,
  } = useGetImage({
    onUpload: (url: string) => {},
  });

  const { user } = useUser();
  console.log(user);

  const handleSubmit = async (formData: FormData) => {
    const avatarImage = formData.get("avatarImage") as File;

    if (avatarImage && avatarImage.size > 0) {
      const previewLink = await uploadToCloudinary(avatarImage);
      formData.set("avatarImage", previewLink);
    }
  };

  return (
    <div className="w-full ">
      <div>
        <div className="flex flex-col gap-3">
          <Input
            hidden
            id="avatarImage"
            name="avatarImage"
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <div
            className={` flex justify-center items-center h-80 bg-gray-300 cursor-pointer px-100 ${
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
                  className="  object-cover w-full h-80"
                />
                <Button
                  className="absolute top-0 right-0 bg-accent text-black w-5 h-5 l"
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
              <div className="flex items-center justify-center w-full cursor-pointer ">
                <div className="flex items-center justify-center bg-black p-2 rounded-md  text-white gap-2">
                  <Camera className="text-white" />
                  <span>Add a cover Image</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-around -mt-10">
          <div>profile section</div>
          <div className="flex flex-col gap-3  bg-white rounded-md border border-gray-300 p-4">
            <h2>
              Buy <span className="font-semibold">{user?.username}</span> a
              Coffee
            </h2>
            <div className="flex flex-col gap-3">
              <p>Select amount:</p>
              <div className="flex gap-3">
                <Button className="bg-secondary text-black p-1 active:border-black">
                  <Coffee /> $1
                </Button>
                <Button className="bg-secondary text-black p-1 active:border-black">
                  <Coffee /> $2
                </Button>
                <Button className="bg-secondary text-black p-1 active:border-black">
                  <Coffee /> $5
                </Button>
                <Button className="bg-secondary text-black p-1 active:border-black">
                  <Coffee /> $10
                </Button>
                <Button className="bg-secondary text-black p-1 active:border-black">
                  <Coffee /> $20
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Enter BuyMeCoffee or social acount URL:</Label>
                <Input
                  type="text"
                  id="socialMediaURL"
                  name="socialMediaURL"
                  placeholder="buymeacoffee.com/"
                />
              </div>
              <div className="flex flex-col gap-2 h-50">
                <Label>Special message:</Label>
                <Input
                  type="text"
                  id="SpecialMessage"
                  name="SpecialMessage"
                  placeholder="Please write your message here"
                  className="h-full"
                />
              </div>
            </div>
            <Button>Support</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
