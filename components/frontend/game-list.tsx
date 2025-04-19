import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GameCard from "@/components/frontend/game-card";

interface GameListProps {
  title: string;
  viewAllText: string;
  viewAllLink: string;
}

export default function GameList({
  title,
  viewAllText,
  viewAllLink,
}: GameListProps) {
  const games = [
    {
      id: 1,
      name: "โครงสร้างข้อมูลและอัลกอริทึม แสตกและคิว",
      nameEn: "Data Structure Stack & Queue",
      difficulty: 8,
      creator: "Tepbahndit Sinkeebubpa",
      accuracy: 100,
      image:
        "https://kzmkhlrnns04h9qq4qpy.lite.vusercontent.net/placeholder.svg?height=150&width=250",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Star className="text-yellow-400 mr-2 h-5 w-5" />
          {title}
        </h2>
        <Button
          variant="ghost"
          asChild
          className="text-purple-600 hover:text-purple-700"
        >
          <Link href={viewAllLink}>{viewAllText}</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
