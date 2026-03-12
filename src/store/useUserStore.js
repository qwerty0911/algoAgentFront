import { create } from 'zustand';

const useUserStore = create((set) => ({
  user_id: null,
  nickname: null,
  setUserInfo: (user_id, nickname) => set({ user_id, nickname }),
  logout: () => set({ user_id: null, nickname: null }),
}));

export default useUserStore;