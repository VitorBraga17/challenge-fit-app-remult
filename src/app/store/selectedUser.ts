import { create } from "zustand";
import { ProfilePerson } from "../types/ProfilePerson";

interface SelectedUserStore {
    selectedUser: ProfilePerson | null;
    setSelectedUser: (user: ProfilePerson | null) => void;
    clearSelectedUser: () => void;
  }
  
  const useSelectedUserStore = create<SelectedUserStore>((set) => ({
    selectedUser: null, // Initial state: no user selected
    setSelectedUser: (user?) => set({ selectedUser: user }), // Set the selected user
    clearSelectedUser: () => set({ selectedUser: null }), // Clear the selected user
  }));
  
  export default useSelectedUserStore;