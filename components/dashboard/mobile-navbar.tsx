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
import { User } from "@supabase/supabase-js";

interface MobileSideBarProps {
  count: number;
  email_token: string;
  next_payment_date: Date | null;
  subscription_code: string;
  status: string;
  createdAt: Date;
  user: User | null;
}

const MobileNavbar = ({
  count,
  status,
  subscription_code,
  createdAt,
  email_token,
  next_payment_date,
  user,
}: MobileSideBarProps) => {
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
          <Sidebar
            count={count}
            status={status}
            subscription_code={subscription_code}
            next_payment_date={next_payment_date}
            email_token={email_token}
            user={user}
            createdAt={createdAt}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
