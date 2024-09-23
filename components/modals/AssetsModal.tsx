"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { modalStore } from "@/lib/store/modal-store";

import { Input } from "../ui/input";
import { createClient } from "@/utils/supabase/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";

const AssetModal = () => {
  const { isOpen, onClose, type } = modalStore();
  const [loading, setLoading] = useState<boolean>(false);
  const open = isOpen && type === "add-asset-modal";

  const { toast } = useToast();

  const handleClose = () => {
    return onClose();
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      file: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const supabase = createClient();
    try {
      setLoading(true);
      if (!values) {
        setLoading(false);
        return toast({ description: "missing field" });
      }
      const { error: fileError } = await supabase.storage
        .from("project_asset")
        .upload(values.file[0].name, values.file[0], {
          cacheControl: "3600",
          upsert: false,
        });

      if (fileError) return toast({ description: fileError.message });

      const fileUrl =
        process.env.NEXT_PUBLIC_BASE_ASSET_FILE_URL + values.file[0].name;

      const assetData = {
        name: values.name,
        url: fileUrl,
      };

      const { data } = await supabase.from("asset").insert(assetData).select();
      if (data?.length) {
        reset();
      }
      toast({
        description: "Upload successful!",
      });
    } catch (error) {
      toast({ description: "Something went wrong try again" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[500px] bg-white p-2 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold mt-4">
            Add Asset
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="  overflow-auto flex items-center justify-center flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1"
          >
            <h3 className="text-sm font-semibold text-zinc-800">Name</h3>
            <Input
              required
              type="text"
              {...register("name", { required: true })}
              className="text-sm ring-1 ring-[#a488f1] font-medium outline-none"
            />
            <h3 className="text-sm font-semibold text-zinc-800 mt-1">
              Asset File
            </h3>
            <Input
              required
              type="file"
              {...register("file", { required: true })}
              accept="image/*"
              className="text-sm ring-1 ring-[#a488f1] font-medium outline-none"
            />
            <Button
              variant="custom"
              className="flex items-center justify-center mt-2"
              type="submit"
            >
              {loading ? (
                <Loader2
                  size={16}
                  className=" animate-spin text-white mx-auto"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <UploadCloud className=" text-zinc-200" size={18} />
                  <span className="text-sm font-semibold text-zinc-200">
                    Upload
                  </span>
                </div>
              )}
            </Button>
          </form>
        </div>
        <DialogFooter className="w-full flex items-center justify-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetModal;
