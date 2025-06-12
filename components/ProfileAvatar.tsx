"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/getProfile";

const ProfileAvatar = () => {
  const [profile, setProfile] = useState<Awaited<
    ReturnType<typeof getProfile>
  > | null>(null);

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Image
      src={profile.avatarImage}
      alt="Avatar"
      width={100}
      height={100}
      className="rounded-full"
    />
  );
};

export default ProfileAvatar;
