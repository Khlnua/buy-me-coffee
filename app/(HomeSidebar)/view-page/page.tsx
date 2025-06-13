"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetImage } from "@/hook/useGetImage";
import { uploadToCloudinary } from "@/utils/get-image-url";
import { useUser } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-label";
import { Camera, Coffee, Heart, X } from "lucide-react";

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
    <div className="w-full relative">
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
                className="  object-cover h-80 w-full"
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

      <div className="flex justify-around -mt-10 gap-5 px-15 ">
        <div className="w-1/2 flex flex-col gap-5.5">
          <div className="flex flex-col gap-3  bg-white rounded-md border border-gray-300 p-4 w-full">
            <div className="flex justify-between items-center ">
              <div className="flex items-center gap-2 font-bold text-[20px]">
                <img
                  className="rounded-full w-12 h-12"
                  src="https://marketplace.canva.com/EAGVaScym-E/1/0/1600w/canva-beige-simple-minimalistic-woman-avatar-xzsp--jqd7I.jpg"
                  alt=""
                />
                {user?.username}
              </div>
              <Button>Edit page</Button>
            </div>
            <hr className="w-full text-gray-300" />
            <div>
              <p className="font-semibold text-[16px]">
                About {user?.username}
              </p>
              <p>
                I’m a typical person who enjoys exploring different things. I
                also make music art as a hobby. Follow me along.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3  bg-white rounded-md border border-gray-300 p-4 w-full">
            <p className="font-semibold text-[16px]">Social media URL</p>
            <p>https://buymeacoffee.com/{user?.username}</p>
          </div>

          <div className="flex flex-col gap-3  bg-white rounded-md border border-gray-300 p-4 w-full">
            <p className="font-semibold text-[16px]">Recent Supporters</p>
            <div className="rounded-md border border-gray-300 p-4 justify-between items-center flex flex-col gap-2">
              <Heart className="fill-black" />
              <p className="font-semibold text-[16px]">
                Be the first one to support
                <span> {user?.username?.toLocaleUpperCase()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3  bg-white rounded-md border border-gray-300 p-4 w-1/2">
          <h2>
            Buy <span className="font-semibold">{user?.username}</span> a Coffee
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
  );
};

export default ViewPage;
