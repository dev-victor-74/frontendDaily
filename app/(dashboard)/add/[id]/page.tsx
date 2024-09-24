"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { ArrowBigLeft, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface SingleAddPageProps {
  params: {
    id: string;
  };
}

const SingleAddPage = ({ params: { id } }: SingleAddPageProps) => {
  const router = useRouter();

  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      displayFile: "",
      designFile: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);
      const displayFile = values.displayFile?.[0];
      const designFile = values.designFile?.[0];

      if (!designFile || !displayFile) {
        setLoading(false);
        return toast({ description: "missing field" });
      }

      const { error: designError } = await supabase.storage
        .from("design")
        .upload(designFile.name, designFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (designError) return toast({ title: "Design image not uploaded" });
      const designFileUrl =
        process.env.NEXT_PUBLIC_BASE_DESIGN_FILE_URL + designFile.name;

      const { error: displayError } = await supabase.storage
        .from("images")
        .upload(displayFile.name, displayFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (displayError) return toast({ title: "Display image not uploaded" });

      const displayFileUrl =
        process.env.NEXT_PUBLIC_BASE_DISPLAY_FILE_URL + displayFile.name;

      const challengeData = {
        name: values.name,
        display_path: displayFileUrl,
        design_path: designFileUrl,
        challenge_id: id,
      };
      const { data } = await supabase
        .from("challenge_pages")
        .insert(challengeData)
        .select();
      if (data?.length) {
        reset();
      }
      toast({
        description: "Upload successful!",
      });
    } catch (error) {
      toast({ description: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-full items-center justify-center">
      <div className="w-full flex items-center">
        <ArrowBigLeft
          onClick={() => router.back()}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full md:w-[60%] lg:w-[45%] mt-10 mx-auto px-5 py-2 bg-slate-50 flex flex-col gap-3 ring-1 ring-[#c9bff8] rounded-sm shadow-md">
        <h1
          className="text-xl md:text-2xl font-bold md:font-extrabold
              text-center text-zinc-800"
        >
          Add Single Pages
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-950">
              Challenge Name
            </label>
            <Input
              required
              type="text"
              {...register("name", { required: true })}
              className="text-sm ring-1 ring-[#a488f1] font-medium outline-none"
            />
          </div>
          <div className=" w-full flex items-center gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Design File
              </label>
              <Input
                type="file"
                {...register("designFile", { required: true })}
                accept="image/*"
                required
                className="text-sm h-8 ring-1 w-full ring-[#a488f1]  font-medium outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Display File
              </label>
              <Input
                accept="image/*"
                type="file"
                required
                {...register("displayFile", { required: true })}
                className="text-sm h-8 ring-1 w-full ring-[#a488f1]  font-medium outline-none"
              />
            </div>
          </div>
          <Button
            variant="custom"
            className="flex items-center justify-center"
            type="submit"
          >
            {loading ? (
              <Loader2 size={16} className=" animate-spin text-white mx-auto" />
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
    </main>
  );
};

export default SingleAddPage;
