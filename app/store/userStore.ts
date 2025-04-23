// app/store/userStore.ts
import { UpdateUserProps, UserProps } from "@/lib/api/user.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// กำหนด interface สำหรับสถานะผู้ใช้
interface UserState {
  user: UserProps | null;

  // Actions
  setUser: (user: UserProps | null) => void;
  updateUser: (userData: UpdateUserProps) => void;
  clearUser: () => void;
}

// สร้าง Zustand store พร้อมกับ persist middleware
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      // Actions
      setUser: (user) => set({ user }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // ชื่อที่จะใช้ใน localStorage
      storage: createJSONStorage(() => {
        // สำหรับ Next.js ควรตรวจสอบว่าอยู่ใน browser หรือไม่
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // สำหรับ SSR/SSG จำเป็นต้องมี fallback storage
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
      partialize: (state) => ({ user: state.user }), // เก็บเฉพาะข้อมูล user
    }
  )
);

// Custom hooks อย่างง่ายสำหรับเข้าถึงข้อมูลผู้ใช้
export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => ({
  setUser: useUserStore((state) => state.setUser),
  updateUser: useUserStore((state) => state.updateUser),
  clearUser: useUserStore((state) => state.clearUser),
});
