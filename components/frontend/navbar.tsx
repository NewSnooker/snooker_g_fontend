import Link from "next/link";
import { Search, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center text-white font-bold mr-2">
              G
            </div>
            <span className="text-2xl font-bold text-purple-600">GameHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
            <Input
              type="text"
              placeholder="ค้นหาเกม..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-200 focus:border-purple-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-purple-600 font-medium border-b-2 border-purple-600"
            >
              หน้าหลัก
            </Link>
            <Link
              href="/#activities"
              className="px-3 py-2 text-gray-600 font-medium hover:text-purple-600"
            >
              กิจกรรม
            </Link>
            <Link
              href="/#classes"
              className="px-3 py-2 text-gray-600 font-medium hover:text-purple-600"
            >
              คลาส
            </Link>
            <Link
              href="/#cards"
              className="px-3 py-2 text-gray-600 font-medium hover:text-purple-600"
            >
              การ์ดความรู้
            </Link>
          </nav>

          {/* Create Button & Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
