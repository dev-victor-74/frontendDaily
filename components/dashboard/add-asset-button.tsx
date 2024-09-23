"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { modalStore } from "@/lib/store/modal-store";

const AddAssetButton = () => {
  const { onOpen } = modalStore();

  return (
    <Button
      variant="ghost"
      onClick={() => onOpen("add-asset-modal")}
      className=" h-[28px] rounded-sm flex items-center justify-center ring-2 ring-slate-500"
    >
      <Plus size={16} />
    </Button>
  );
};

export default AddAssetButton;
