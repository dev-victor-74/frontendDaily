"use client";

import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

const UpgradeBtn = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onUpgrade = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onUpgrade}
      variant="custom"
      className={cn(
        "flex text-xs tracking-wide items-center gap-1 rounded-sm hover:bg-gradient-to-r hover:from-orange-700 to hover:to-blue-800  bg-gradient-to-r from-orange-700 to-blue-700",
        loading && " opacity-50"
      )}
      disabled={loading}
    >
      <Zap size={16} className="text-zinc-200 animate-bounce" />
      Upgrade Now!
    </Button>
  );
};

export default UpgradeBtn;
