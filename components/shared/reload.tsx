
import { useRouter } from "next/router";
import { Button } from "../ui/button";

export default function ReloadButton() {
  const router = useRouter();
  const handleReload = () => {
    router.reload();
  };
  return (
    <div className=" flex justify-center items-center min-h-screen">
    <Button className=" bg-primary-500 hover:bg-primary-500/80" onClick={handleReload}>
      Reload 
    </Button>
    </div>
  );
}
