"use client";

import { useUser } from "@clerk/nextjs";
import { SideBar } from "@/components/SideBar";
// import ProfileAvatar from "@/components/ProfileAvatar";
import { LoadingCoffeeGif } from "@/components/LoadingCoffeeGif";

const Homepage = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingCoffeeGif />;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <div className="flex items-start justify-start w-full min-h-screen px-20">
      <SideBar />
      <div>{/* <ProfileAvatar /> */}</div>
    </div>
  );
};

export default Homepage;
