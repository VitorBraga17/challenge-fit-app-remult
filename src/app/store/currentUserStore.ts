import { create } from "zustand";
import { User } from "../shared/Users";

interface CurrentUserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clearCurrentUser: () => void;
}

const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null, // Initial state: no user selected
  setCurrentUser: (user?) => set({ currentUser: user }), // Set the selected user
  clearCurrentUser: () => set({ currentUser: null }), // Clear the selected user
}));

export default useCurrentUserStore;
