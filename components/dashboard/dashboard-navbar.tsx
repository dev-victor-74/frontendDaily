"use client";

import { createClient } from "@/utils/supabase/client";

import Image from "next/image";
import MobileNavbar from "./mobile-navbar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { modalStore, UseSubscription, useUser } from "@/lib/store/modal-store";
import { useToast } from "@/hooks/use-toast";
import { _30_DAYS_IN_MILLISECONDS } from "@/lib/constants";
import PremiumBadge from "./premium-badge";

interface dashboardNavbarProps {
  user: User | null;
  count: number;
}

const DashboardNavbar = ({ user, count }: dashboardNavbarProps) => {
  const { subscription } = UseSubscription();
  const supabase = createClient();
  const router = useRouter();
  const { onLogout } = useUser();
  const { onOpen } = modalStore();
  const { toast } = useToast();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Something went wrong",
        description: "please try again",
        variant: "destructive",
      });
    } else {
      onLogout();
      router.refresh();
    }
  };

  const isPro =
    (subscription &&
      subscription.status === "active" &&
      new Date(subscription.next_payment_date as string).getTime() >
        Date.now()) ||
    ((subscription?.status === "cancelled" ||
      subscription?.status === "non-renewing") &&
      new Date().getTime() - new Date(subscription.createdAt).getTime() <=
        _30_DAYS_IN_MILLISECONDS);

  return (
    <div className="w-full h-[55px] py-2 border-b border-[#e5e1f0] flex items-center justify-between">
      <div className="w-full flex">
        <MobileNavbar count={count} />
      </div>

      <div className="w-full flex items-center justify-end md:px-1">
        {isPro && user ? (
          <div className=" flex items-center justify-center mr-2">
            <PremiumBadge />
          </div>
        ) : null}
        <Popover>
          <PopoverTrigger asChild>
            {user ? (
              <Button
                variant="ghost"
                className="bg-transparent h-8 w-8 overflow-hidden relative ring-2 ring-[#170e31] rounded-full "
              >
                <Image
                  src={user?.user_metadata.avatar_url}
                  fill
                  alt="profile"
                  className=" ring-2 ring-[#170e31] object-contain"
                />
              </Button>
            ) : (
              <Button
                variant="custom"
                className="px-4"
                onClick={() => onOpen("auth-modal")}
              >
                Sign in
              </Button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[280px] bg-slate-50">
            <div className="flex flex-col gap-4">
              <div className="w-full mb-2 text-sm font-semibold text-zinc-800">
                {user?.user_metadata.user_name}
              </div>
              <div className="w-full text-sm font-medium text-neutral-800">
                {user?.user_metadata.email}
              </div>
              <Button
                onClick={logout}
                variant="outline"
                className="justify-start w-full px-1 font-semibold"
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DashboardNavbar;