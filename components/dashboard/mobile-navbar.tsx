"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const MobileNavbar = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden flex">
            <Menu size={20} color="black" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-10">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <Sidebar count={count} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
