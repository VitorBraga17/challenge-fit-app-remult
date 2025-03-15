import { create } from "zustand";
import { Habits } from "../shared/Habits";

interface SelectedChallengeHabitsStore {
  selectedChallengeHabits: Habits[] | null;
  setSelectedChallengeHabits: (challengeHabits: Habits[] | null) => void;
  clearSelectedChallengeHabits: () => void;
}

const useSelectedChallengeHabitsStore = create<SelectedChallengeHabitsStore>(
  (set) => ({
    selectedChallengeHabits: null, // Initial state: no challenge habits selected
    setSelectedChallengeHabits: (challengeHabits?) =>
      set({ selectedChallengeHabits: challengeHabits }), // Set the selected challenge habits
    clearSelectedChallengeHabits: () => set({ selectedChallengeHabits: null }), // Clear the selected challenge habits
  })
);

export default useSelectedChallengeHabitsStore;