"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const MobileNavbar = () => {
  return (
    <div className="flex items-center">
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
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
