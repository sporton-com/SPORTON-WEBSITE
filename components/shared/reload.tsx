"use client"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ReloadButton() {
  const router = useRouter();
  const handleReload = () => {
    router.refresh();
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
    <Button className=" bg-primary-500 hover:bg-primary-500/80" onClick={handleReload}>
      Reload 
    </Button>
    </div>
  );
}
