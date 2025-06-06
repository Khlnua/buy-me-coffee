// "use client";

// import Form from "next/form";
// import { uploadToCloudinary } from "../../utils/get-image-url";
// import { createProfile } from "../actions/create-profile";
// import { Camera } from "lucide-react";
// import { X } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useGetImage } from "@/hook/useGetImage";
// import { useActionState, useTransition } from "react";
// import { ZodErrors } from "./ZodError";
// import { error } from "console";

// type ProfileStepProps = {
//   currentStep: number;
//   nextStep: () => void;
//   previousStep: () => void;
// };

// const INITIAL_STATE = {
//   data: null,
//   message: "",
//   ZodError: { avatarImage: [], name: [], about: [], socialMediaURL: [] },
// };

// export default function NewProfile({ nextStep }: ProfileStepProps) {
//   const [formState, formAction] = useActionState(createProfile, INITIAL_STATE);
//   const [, starTransition] = useTransition();

//   const {
//     fileInputRef,
//     previewLink,
//     uploading,
//     isDragging,
//     openBrowse,
//     handleFileSelect,
//     handleDrop,
//     deleteImage,
//     setIsDragging,
//   } = useGetImage({
//     onUpload: (url: string) => {},
//   });

//   const handleSubmit = async (formData: FormData) => {
//     const avatarImage = formData.get("avatarImage") as File;

//     const previewLink = await uploadToCloudinary(avatarImage);
//     console.log({ previewLink });
//     formData.set("avatarImage", previewLink);

//     // Activate validation before submitting the form
//     if (
//       !formData.get("name") ||
//       !formData.get("about") ||
//       !formData.get("socialMediaURL") ||
//       !formData.get("avatarImage")
//     ) {
//       formAction({
//         ZodErrorS: {
//           avatarImage: ["Please upload an image"],
//           name: ["Please enter your name"],
//           about: ["Please write about yourself"],
//           socialMediaURL: ["Please enter a valid social media URL"],
//         },
//         message: "Missing Fields, Failed to make profile",
//       });
//       return;
//     }
//     starTransition(() => formAction(formData));
//   };

//   return (
//     <div className="w-127 w-max-168 flex flex-col gap-6">
//       <h3 className="font-semibold text-2xl">Complete your profile page</h3>
//       <Form action={handleSubmit} className="space-y-6">
//         <div className="flex flex-col gap-3">
//           <Label htmlFor="avatarImage" className="text-sm font-medium">
//             Add photo
//           </Label>
//           <Input
//             hidden
//             id="avatarImage"
//             name="avatarImage"
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileSelect}
//           />

//           <div
//             className={` rounded-full flex justify-center items-center w-40 h-40 border-2 border-dashed cursor-pointer ${
//               isDragging ? "border-dashed" : "border-dashed"
//             }`}
//             onClick={openBrowse}
//             onDrop={handleDrop}
//             onDragOver={(event) => {
//               event.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={() => setIsDragging(false)}
//           >
//             {previewLink ? (
//               <div className="relative w-full h-full">
//                 <img
//                   src={previewLink}
//                   alt=""
//                   className="rounded-full object-cover w-40 h-40"
//                 />
//                 <Button
//                   className="absolute top-0 right-0 bg-accent text-black w-5 h-5 rounded-full"
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     deleteImage();
//                   }}
//                   type="button"
//                 >
//                   <X />
//                 </Button>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500">
//                 {uploading ? "Uploading..." : <Camera />}
//               </p>
//             )}
//           </div>
//           <ZodErrors error={formState?.ZodError?.avatarImage} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your name here"
//           />
//           <ZodErrors error={formState?.ZodError?.name} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="about">About</Label>
//           <Input
//             type="text"
//             id="about"
//             name="about"
//             placeholder="Write about yourself here"
//             className="min-h-20"
//           />
//           <ZodErrors error={formState?.ZodError?.about} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <Label htmlFor="socialMediaURL">Social media URL</Label>
//           <Input
//             type="text"
//             id="socialMediaURL"
//             name="socialMediaURL"
//             placeholder="https://"
//           />
//           <ZodErrors error={formState?.ZodError?.socialMediaURL} />
//         </div>

//         <Button type="submit">Continue</Button>
//       </Form>
//     </div>
//   );
// }

"use client";

import { useActionState, useTransition } from "react";
import { Camera, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetImage } from "@/hook/useGetImage";
import { uploadToCloudinary } from "../../utils/get-image-url";
import { createProfile } from "../actions/create-profile";
import { ZodErrors } from "./ZodError";

type ProfileStepProps = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: {
    avatarImage: [],
    name: [],
    about: [],
    socialMediaURL: [],
  },
};

export default function NewProfile({ nextStep }: ProfileStepProps) {
  const [formState, formAction] = useActionState(createProfile, INITIAL_STATE);
  const [, startTransition] = useTransition();

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

  const handleSubmit = async (formData: FormData) => {
    const avatarImage = formData.get("avatarImage") as File;

    if (avatarImage && avatarImage.size > 0) {
      const previewLink = await uploadToCloudinary(avatarImage);
      formData.set("avatarImage", previewLink);
    }

    startTransition(() => {
      formAction(formData);
    });

    if (!ZodErrors.length) {
      nextStep();
    }
  };

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>
      <form action={handleSubmit} className="space-y-6">
        {/* Image Upload */}
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
          <ZodErrors error={formState?.ZodError?.avatarImage} />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here"
          />
          <ZodErrors error={formState?.ZodError?.name} />
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="about">About</Label>
          <Input
            type="text"
            id="about"
            name="about"
            placeholder="Write about yourself here"
            className="min-h-20"
          />
          <ZodErrors error={formState?.ZodError?.about} />
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="socialMediaURL">Social media URL</Label>
          <Input
            type="text"
            id="socialMediaURL"
            name="socialMediaURL"
            placeholder="https://"
          />
          <ZodErrors error={formState?.ZodError?.socialMediaURL} />
        </div>

        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Continue"}
        </Button>

        {formState.message && (
          <p className="text-sm text-red-500">{formState.message}</p>
        )}
      </form>
    </div>
  );
}
