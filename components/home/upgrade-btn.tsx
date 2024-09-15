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
        title: "error",
      });
    }
  };

  return (
    <Button
      onClick={onUpgrade}
      variant="custom"
      className="flex text-xs tracking-wide items-center gap-1 rounded-sm  bg-gradient-to-r from-pink-900 to-blue-800"
    >
      <Zap size={16} className="text-green-600 animate-bounce" />
      Upgrade Now!
    </Button>
  );
};

export default UpgradeBtn;
