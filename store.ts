import create from "zustand";

type AuthStore = {
    isLoggedIn?: boolean;
    isCheckingSession?: boolean;
    user?: {
        name: string;
        token?: string;
        email: string;
    };
    setAuthStatus: <T extends keyof AuthStore>(
        key: T,
        value: AuthStore[T]
    ) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isCheckingSession: true,
    setAuthStatus: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
