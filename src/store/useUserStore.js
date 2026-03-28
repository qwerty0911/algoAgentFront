import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(persist((set) => ({
  user_id: null,
  nickname: null,
  setUserInfo: (user_id, nickname) => set({ user_id, nickname }),
  logout: () => set({ user_id: null, nickname: null }),
}), {
  name: 'user-storage',
}));

export default useUserStore;