"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  ChallengeDataStore,
  modalStore,
  UseSubscription,
  useUser,
} from "@/lib/store/modal-store";
import JSZip from "jszip";
import { addTakenChallenge } from "@/utils/actions/favouritechallenge";
import { createClient } from "@/utils/supabase/client";
import {
  createApiLimit,
  increaseApilimit,
  ResetApiLimit,
} from "@/utils/actions/apilimit";
import {
  _30_DAYS_IN_MILLISECONDS,
  FREE_MAX_API_LIMIT_COUNT,
  PRO_MAX_API_LIMIT_COUNT,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonProps {
  name: string;
  tasks: string;
  challengeId: string;
  challengeSatus: string;
  status: string;
  next_payment_date: Date | null;
  createdAt: Date;
}
const DownloadButton = ({
  name,
  challengeId,
  tasks,
  challengeSatus,
  status,
  next_payment_date,
  createdAt,
}: DownloadButtonProps) => {
  const { challengeData } = ChallengeDataStore();
  const { subscription } = UseSubscription();
  const user = useUser((state) => state.user);
  const { onOpen } = modalStore();

  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const isPro =
    (status &&
      status === "active" &&
      new Date(next_payment_date as Date).getTime() > Date.now()) ||
    ((status === "cancelled" || status === "non-renewing") &&
      new Date().getTime() - new Date(createdAt).getTime() <=
        _30_DAYS_IN_MILLISECONDS);

  const validateDownload = async (status: string) => {
    if (!user) return onOpen("auth-modal");

    if (status.toLowerCase() === "premium" && !isPro) {
      return onOpen("free-limit-modal");
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_api_limit")
      .select("*")
      .eq("user_id", user?.id)
      .limit(1);

    if (error) {
      return toast({
        description:
          "Something went wrong, please check your internet connections and try again!",
        variant: "destructive",
      });
    }

    if (
      data.length &&
      new Date().getMonth() - new Date(data[0].last_reset_date).getMonth() >= 1
    ) {
      await ResetApiLimit(user.email);
    }

    try {
      const { data: userApiLimit } = await supabase
        .from("user_api_limit")
        .select("*")
        .eq("user_id", user?.id);

      if (!userApiLimit?.length) {
        await handleDownload();
        await createApiLimit(user.id, user.email);
        return;
      }

      if (isPro && userApiLimit[0].count === PRO_MAX_API_LIMIT_COUNT) {
        return onOpen("api-limit-count");
      }
      if (isPro && userApiLimit[0].count < PRO_MAX_API_LIMIT_COUNT) {
        await handleDownload();
        await increaseApilimit(user.id, user.email);
        return;
      }

      if (!isPro && userApiLimit[0].count === FREE_MAX_API_LIMIT_COUNT) {
        return onOpen("api-limit-count");
      }
      if (!isPro && userApiLimit[0].count < FREE_MAX_API_LIMIT_COUNT) {
        await handleDownload();
        await increaseApilimit(user.id, user.email);
        return;
      }
    } catch (error) {
      toast({
        title: "Error Trying to access resources!",
        description: "You might be out of accessible resource for the month",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  };

  const download = (file: Blob) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const zip = new JSZip();
      const filesfolder = zip.folder("challenge_files");

      const promises = challengeData.map(async (data) => {
        const response = await fetch(data.address);
        const blob = await response.blob();
        return blob;
      });

      const blobs = await Promise.all(promises);
      blobs.forEach((blob, index) => {
        filesfolder?.file(`${challengeData[index].name}.jpg`, blob);
      });

      const readMe = zip.folder("readme");
      readMe?.file("readme.txt", `${tasks}`);

      const zipFile = await zip.generateAsync({ type: "blob" });
      download(zipFile);
      toast({
        title: "Downloaded successfully!",
        variant: "default",
      });
      await addTakenChallenge(challengeId);
    } catch (error) {
      toast({
        title: "Failed to download file",
        description: "please try again!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={() => validateDownload(challengeSatus)}
      variant="custom"
      className="w-full sm:w-[70%] md:w-[40%] lg:w-[25%] flex items-center justify-center rounded-sm hover:scale-[1.02] transition"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <div className="w-full flex items-center gap-2 justify-center">
          <span>Download</span>
          <Download size={14} className=" text-zinc-200" />
        </div>
      )}
    </Button>
  );
};

export default DownloadButton;
