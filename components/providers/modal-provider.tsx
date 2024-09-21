"use client";

import { useEffect, useState } from "react";
import { ChallengeModal } from "../dashboard/challenge-modal";
import FreeLimitModal from "../modals/FreeLimitModal";
import ProModal from "../modals/ProModal";
import AuthModal from "../modals/authmodal";
import ApiLimitModal from "../modals/ApiLimitModal";
import AssetModal from "../modals/AssetsModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;
  return (
    <>
      <ChallengeModal />
      <FreeLimitModal />
      <ApiLimitModal />
      <ProModal />
      <AuthModal />
      <AssetModal />
    </>
  );
};

export default ModalProvider;
