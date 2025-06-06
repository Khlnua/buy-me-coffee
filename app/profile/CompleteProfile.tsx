"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CompleteProfile = () => {
  const { session } = useSession();
  const { push } = useRouter();

  const handleCompleteProfile = async () => {
    await fetch("/api/complete-bankCard", { method: "POST" });

    await session?.reload();

    push("http://localhost:3000");
  };

  return <Button onClick={handleCompleteProfile}>Done</Button>;
};

export default CompleteProfile;
