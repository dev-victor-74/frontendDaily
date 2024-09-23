"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2 } from "lucide-react";
import createchallenge from "@/utils/actions/createchallenge";
import { useToast } from "@/hooks/use-toast";

const AddChallengePage = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      skills: "",
      status: "",
      type: "",
      level: "",
      difficulty: "",
      tasks: "",
      displayImage: "",
      designImage: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);
      const displayFile = values.displayImage?.[0];
      const designFile = values.designImage?.[0];

      if (!designFile || !displayFile) {
        setLoading(false);
        return toast({ description: "missing field" });
      }

      const { data: designData, error: designError } = await supabase.storage
        .from("design")
        .upload(designFile.name, designFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (designError) return toast({ title: "Design image not uploaded" });

      const { data: displayData, error: displayError } = await supabase.storage
        .from("images")
        .upload(displayFile.name, displayFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (displayError) return toast({ title: "Display image not uploaded" });

      const displayFileUrl =
        process.env.NEXT_PUBLIC_BASE_DISPLAY_FILE_URL + displayFile.name;
      const designFileUrl =
        process.env.NEXT_PUBLIC_BASE_DESIGN_FILE_URL + designFile.name;

      const challengeData = {
        name: values.name,
        type: values.type,
        status: values.status,
        difficulty: values.difficulty,
        skills: values.skills,
        level: values.level,
        tasks: values.tasks,
        displayImage: displayFileUrl,
        designImage: designFileUrl,
        description: values.description,
        colors: values.colors,
      };
      const data = await createchallenge(challengeData);
      reset();
      toast({ description: "successfully created" });
      if (
        data?.[0].type.toLowerCase() === "multipage" ||
        data?.[0].type.toLowerCase() === "multicard"
      ) {
        return router.push(`/add/${data?.[0].id}`);
      }
    } catch (error) {
      toast({ description: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-full items-center justify-center">
      <div className="w-full md:w-[60%] lg:w-[45%] mt-8 md:mt-3 mx-auto px-5 py-2 flex flex-col gap-3 bg-slate-50 rounded-sm shadow-md ring-1 ring-[#c9bff8]">
        <h1
          className="text-xl font-bold
              text-center text-zinc-800"
        >
          Add New Challenge
        </h1>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
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
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Challenge Type
              </label>
              <Input
                required
                {...register("type", { required: true })}
                type="text"
                placeholder="single page | multi page"
                className="text-sm ring-1 ring-[#a488f1]  font-medium outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Challenge Skills
              </label>
              <Input
                required
                {...register("skills", { required: true })}
                type="text"
                placeholder="css | html | js"
                className="text-sm ring-1  ring-[#a488f1]  font-medium outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Challenge status
              </label>
              <Input
                required
                type="text"
                placeholder="Free | Premium"
                {...register("status", { required: true })}
                className="text-sm ring-1 ring-[#a488f1] font-medium outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Difficulty Level
              </label>
              <Input
                required
                {...register("difficulty", { required: true })}
                type="text"
                placeholder="Easy, medium or hard"
                className="text-sm ring-1 ring-[#a488f1] w-full  font-medium outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-bold text-neutral-950">
                Challenge Level
              </label>
              <Input
                required
                {...register("level", { required: true })}
                type="text"
                placeholder="beginner | intermediate | advanced"
                className="text-sm ring-1 ring-[#a488f1] w-full font-medium outline-none"
              />
            </div>
          </div>
          {/* <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-950">
              Challenge Colors
            </label>
            <textarea
              {...register("colors")}
              rows={2}
              className="w-full p-1 text-sm rounded-sm ring-1 focus:ring-slate-950 ring-[#a488f1]  font-medium outline-none"
            />
          </div> */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-950">Tasks</label>
            <textarea
              required
              {...register("tasks", { required: true })}
              rows={3}
              className="w-full p-1 text-sm rounded-sm ring-1 focus:ring-slate-950 ring-[#a488f1]  font-medium outline-none"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-950">
              Challenge Description
            </label>
            <textarea
              required
              {...register("description", { required: true })}
              rows={4}
              className="w-full p-1 text-sm rounded-sm ring-1 focus:ring-slate-950 ring-[#a488f1]  font-medium outline-none"
            />
          </div>
          <div className="flex flex-col w-full items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-neutral-950">
                  Design File
                </label>
                <Input
                  {...register("designImage", { required: true })}
                  type="file"
                  accept="image/*"
                  className="text-sm cursor-pointer h-8 ring-1 w-full ring-[#a488f1]  font-medium outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-neutral-950">
                  Display File
                </label>
                <Input
                  {...register("displayImage", { required: true })}
                  accept="image/*"
                  type="file"
                  className="text-sm cursor-pointer h-8 w-full ring-1 ring-[#a488f1]  font-medium outline-none"
                />
              </div>
            </div>
            <Button
              disabled={loading}
              variant="custom"
              type="submit"
              className={cn("w-full flex items-center")}
            >
              {loading ? (
                <div className="w-full flex items-center justify-center gap-2 text-zinc-200">
                  <Loader2 size={16} className=" animate-spin" />
                </div>
              ) : (
                <div className="w-full flex items-center justify-center gap-2  text-zinc-200">
                  <CloudUpload size={16} />
                  <span>upload</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddChallengePage;
