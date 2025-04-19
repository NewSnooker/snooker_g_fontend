import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileSidebarProps {
  name: string;
  coins: number;
}

export default function ProfileSidebar({ name, coins }: ProfileSidebarProps) {
  return (
    <div className="bg-purple-100 rounded-xl p-6 sticky top-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-medium text-purple-800">
            Hello,
            <br />
            <span className="text-2xl">{name}</span>
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="text-purple-600">
          <Edit className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <Image
            src="https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=150"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center">
          <Image
            src="https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=24&width=24"
            alt="Coin"
            width={24}
            height={24}
            className="mr-2"
          />
          รับ 100 เหรียญ
        </Button>
        <div className="bg-white rounded-full px-4 py-2 flex items-center justify-center">
          <Image
            src="https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=24&width=24"
            alt="Coin"
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-medium">{coins} เหรียญ</span>
        </div>
      </div>
    </div>
  );
}
