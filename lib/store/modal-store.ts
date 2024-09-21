import { create } from "zustand";

type modalType =
  | "free-limit-modal"
  | "challenge-modal"
  | "api-limit-count"
  | "pro-modal"
  | "auth-modal"
  | "add-asset-modal";

type modalStoreType = {
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType) => void;
  onClose: () => void;
};

export const modalStore = create<modalStoreType>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set(() => ({ type: null })),
}));

export interface imageData {
  name: string;
  address: string;
  mobile?: string;
}

interface ChallengeData {
  challengeData: imageData[];
  onClear: () => void;
  onAdd: (data: imageData) => void;
}

export const ChallengeDataStore = create<ChallengeData>((set) => ({
  challengeData: [],
  onClear: () => set({ challengeData: [] }),
  onAdd: (data) =>
    set((state) => ({
      challengeData: [...state.challengeData, data],
    })),
}));

export interface DbUser {
  email: string;
  id: string;
  username: string;
  role: string;
  profile_url: string;
  created_at: Date;
}

interface userState {
  user: DbUser | undefined;
  onLogin: (data: DbUser) => void;
  onLogout: () => void;
}

export const useUser = create<userState>((set) => ({
  user: undefined,
  onLogin: (data: DbUser) => set({ user: data }),
  onLogout: () => set({ user: undefined }),
}));

type status = "free" | "active" | "non-renewing" | "cancelled";
interface Subscription {
  id: number;
  email_token: string;
  amount: number;
  next_payment_date: Date | Number | "" | null;
  subscription_code: string;
  status: status;
  createdAt: Date;
}

interface UserSubscription {
  subscription: Subscription | undefined;
  onLoadSubscription: (sub: Subscription) => void;
}

export const UseSubscription = create<UserSubscription>((set) => ({
  subscription: undefined,
  onLoadSubscription: (sub) => set({ subscription: sub }),
}));
