import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JoinGame() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex items-center gap-2">
        <Input
          type="text"
          placeholder="ใส่โค้ดเข้าร่วมห้องเล่นเกม"
          className=""
        />
        <Button>เข้าร่วม</Button>
      </div>
    </div>
  );
}
