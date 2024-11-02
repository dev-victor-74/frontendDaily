"use client";

import { CircleUser, Palette, SquareKanban, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AiOutlineHeart } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { Button } from "../ui/button";
import { DbUser, modalStore, useUser } from "@/lib/store/modal-store";
import {
  _30_DAYS_IN_MILLISECONDS,
  FREE_MAX_API_LIMIT_COUNT,
  PRO_MAX_API_LIMIT_COUNT,
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { User } from "@supabase/supabase-js";

interface SidebarProps {
  count: number;
  email_token: string;
  next_payment_date: Date | null;
  subscription_code: string;
  status: string;
  createdAt: Date;
  user: User | null;
  dBuser: DbUser;
}

const Sidebar = ({
  email_token,
  next_payment_date,
  subscription_code,
  status,
  createdAt,
  count,
  user,
  dBuser,
}: SidebarProps) => {
  const pathname = usePathname();
  const { onOpen } = modalStore();
  const { onLogin } = useUser();

  // const { subscription } = UseSubscription();
  // const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    onLogin(dBuser);
  }, [onLogin]);

  const routes = [
    {
      label: "Challenges",
      path: "/challenges",
      Icon: SquareKanban,
    },
    {
      label: "Favourites",
      path: "/favourites",
      Icon: AiOutlineHeart,
    },
    {
      label: "Media Assets",
      path: "/assets",
      Icon: BiImages,
    },
    {
      label: "Colors",
      path: "/colors",
      Icon: Palette,
    },

    {
      label: "Profile",
      path: "/profile",
      Icon: CircleUser,
    },
  ];
  const isPremium =
    (status &&
      status === "active" &&
      new Date(next_payment_date as Date).getTime() > Date.now()) ||
    ((status === "cancelled" || status === "non-renewing") &&
      new Date().getTime() - new Date(createdAt).getTime() <=
        _30_DAYS_IN_MILLISECONDS);

  const onManageSubscription = async () => {
    if (status === "cancelled" || status === "non-renewing") {
      return toast({
        description: (
          <p className="text-sm font-semibold text-orange-900">
            You have already cancelled your subscription
          </p>
        ),
      });
    }
    if (!user?.email || !subscription_code) {
      onOpen("auth-modal");
      return;
    }

    const data = {
      code: subscription_code,
      email_token: email_token,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/cancel", {
        method: "post",
        body: JSON.stringify(data),
      });
      const response = await res.json();
      window.location.href = response.data.link;
    } catch (error) {
      toast({
        title: "could not complete request",
      });
    } finally {
      setLoading(false);
    }
  };

  const openProModal = () => {
    if (!user) {
      return onOpen("auth-modal");
    }

    return onOpen("pro-modal");
  };

  return (
    <div className="w-full h-full flex flex-col px-2 bg-white">
      <div className="flex items-center gap-1 mt-2">
        <div className="w-[27px] h-[27px] relative ">
          <Image src="/logo.png" fill alt="logo" />
        </div>
        <div className="text-lg text-zinc-800 font-semibold md:font-bold">
          FrontendDaily
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.path}
            className={cn(
              "w-full py-3 px-2 rounded-sm flex items-center gap-[6px] hover:bg-slate-200",
              route.path === pathname && "bg-slate-200"
            )}
          >
            <route.Icon size={17} color="black" />
            <div className="text-[12px] font-semibold tracking-wider">
              {route.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-auto w-full p-2 ring-1 shadow-sm ring-[#d9d9db] rounded-sm bg-slate-50 flex flex-col gap-1">
        {user && isPremium ? (
          <p className=" text-xs font-semibold text-neutral-950 text-center">
            {count ? count : 0} / {PRO_MAX_API_LIMIT_COUNT}
          </p>
        ) : user && !isPremium ? (
          <p className=" text-xs font-semibold text-neutral-950 text-center">
            {count ? count : 0} / {FREE_MAX_API_LIMIT_COUNT}
          </p>
        ) : (
          ""
        )}
        {isPremium ? (
          <Button
            onClick={onManageSubscription}
            variant="custom"
            className={cn(
              "flex text-xs tracking-wide items-center gap-1 rounded-sm",
              loading && "bg-[#9279d8]"
            )}
            disabled={loading}
          >
            {user ? "Manage subscription" : "Go Premium"}
          </Button>
        ) : (
          <Button
            onClick={openProModal}
            variant="custom"
            className="text-xs font-semibold tracking-wide text-zinc-200 flex items-center gap-1 px-2 py-2 rounded-sm "
          >
            <Zap size={12} className=" animate-bounce text-white" /> Go Premium
          </Button>
        )}
      </div>
      <div className="w-full px-1 mt-4 flex items-center justify-center gap-5">
        <Link
          href={"/terms"}
          className=" text-xs font-semibold text-neutral-800"
        >
          Terms{" "}
        </Link>
        <Link
          href={"/policy"}
          className=" text-xs font-semibold text-neutral-800"
        >
          {" "}
          Policy
        </Link>
        <a
          href="mailto:victornnamdi835@gmail.com"
          className=" text-xs font-semibold text-neutral-800"
        >
          {" "}
          Contact
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
