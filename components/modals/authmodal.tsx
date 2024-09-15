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
import { createClient } from "@/utils/supabase/client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Provider } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const AuthModal = () => {
  const supabase = createClient();
  const { isOpen, onClose, type } = modalStore();
  const { toast } = useToast();

  const open = isOpen && type === "auth-modal";

  const handleClose = () => {
    return onClose();
  };

  const pathname = "/challenges";

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });

    if (error) {
      return toast({
        description: "Something went wrong",
      });
    }
    // handleClose();
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });

    if (error) {
      return toast({
        description: "Something went wrong",
      });
    }
    // handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[425px] sm:max-w-[450px] md:max-w-[400px] lg:max-w-[400px] bg-white p-5 rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold mt-4"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div className=" w-full flex items-center justify-center flex-col gap-2">
          <div className="px-3 py-4 ring-1 ring-[#dfd6eb] rounded-md shadow-lg w-full">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="w-full flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 flex-col">
                  <div className="text-xl md:text-2xl font-semibold md:font-bold">
                    frontendprojects
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm text-center font-semibold text-neutral-800">
                    Welcome Back
                  </h3>
                  <p className="text-sm text-center font-medium text-neutral-900">
                    Sign In to continue to frontendprojects
                  </p>
                </div>
              </div>
              <div className="w-full flex items-center flex-col gap-4 mt-4">
                <Button
                  onClick={signIn}
                  variant="outline"
                  className="w-full ring-1 rounded-sm ring-[#a69cfd]"
                >
                  <div className="w-full flex items-center justify-center gap-3">
                    <FaGithub size={24} />
                    <span>Github</span>
                  </div>
                </Button>
                <Button
                  onClick={signInWithGoogle}
                  variant="outline"
                  className="w-full ring-1 rounded-sm ring-[#a69cfd]"
                >
                  <div className="w-full flex items-center justify-center gap-3">
                    <FcGoogle size={24} />
                    <span>Google</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="w-full flex items-center justify-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
