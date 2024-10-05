"use client";

import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const UpgradeBtn = () => {
  const { toast } = useToast();

  const onUpgrade = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "post",
      });
      const response = await res.json();
      if (window.location) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      toast({
        title: "error initialising payment",
      });
    }
  };

  return (
    <Button
      onClick={onUpgrade}
      variant="custom"
      className="flex text-xs tracking-wide items-center gap-1 rounded-sm hover:bg-gradient-to-r hover:from-orange-700 to hover:to-blue-800  bg-gradient-to-r from-orange-700 to-blue-700"
    >
      <Zap size={16} className="text-zinc-200 animate-bounce" />
      Upgrade Now!
    </Button>
  );
};

export default UpgradeBtn;
