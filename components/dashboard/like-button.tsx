"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";

import {
  deleteChallenge,
  favouriteChallenge,
} from "@/utils/actions/favouritechallenge";
import { Button } from "../ui/button";
import { useUser } from "@/lib/store/modal-store";

interface FavouriteButtonProps {
  challengeId: string;
}
const LikeButton = ({ challengeId }: FavouriteButtonProps) => {
  const supabase = createClient();
  const [isFavourite, setIsFavourite] = useState(false);

  const user = useUser((state) => state.user);
  const { toast } = useToast();

  useEffect(() => {
    const getUserDetails = async () => {
      if (!user) return;

      const { data: favourite, error } = await supabase
        .from("favourites")
        .select()
        .eq("user_id", user.id)
        .eq("challenge_id", challengeId);

      if (!error && favourite?.length) {
        setIsFavourite(true);
      }
    };
    getUserDetails();
  }, [challengeId, user]);

  const handleFavourite = async () => {
    setIsFavourite(true);
    favouriteChallenge(challengeId, user?.id);
    toast({ description: "Added to favourites" });
  };

  const handleUnFavourite = async () => {
    setIsFavourite(false);
    deleteChallenge(challengeId, user?.id);
    toast({ description: "Removed from favourites" });
  };

  return (
    <div className="flex items-center justify-center">
      {isFavourite ? (
        <Button
          variant="ghost"
          onClick={handleUnFavourite}
          className="bg-transparent border-none rounded-full flex items-center hover:bg-slate-200 justify-center hover:opacity-85"
        >
          <AiFillHeart size={18} color="#703cff" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={handleFavourite}
          className="bg-transparent border-none flex items-center hover:bg-slate-200 justify-center hover:opacity-85"
        >
          <AiOutlineHeart size={18} />
        </Button>
      )}
    </div>
  );
};

export default LikeButton;
