import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Game } from "@/lib/types";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={
            game.image ||
            "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg"
          }
          alt={game.name}
          width={250}
          height={150}
          className="w-full h-32 object-cover"
        />
        <Badge
          className="absolute top-2 right-2 bg-white text-gray-700"
          variant="outline"
        >
          ระดับ {game.difficulty}/10
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-2 h-12">
          {game.name} <span className="text-gray-500">({game.nameEn})</span>
        </h3>
        <p className="text-sm text-gray-500 mt-1">โดย: {game.creator}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>ความแม่นยำ</span>
            <span className="font-medium">{game.accuracy}%</span>
          </div>
          <Progress
            value={game.accuracy}
            className="h-2"
            indicatorClassName={
              game.accuracy > 90
                ? "bg-green-500"
                : game.accuracy > 70
                ? "bg-yellow-500"
                : "bg-orange-500"
            }
          />
        </div>
      </CardFooter>
    </Card>
  );
}
