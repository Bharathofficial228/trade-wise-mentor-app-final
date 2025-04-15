import { create } from 'zustand';
import { Playbook } from '../types';

interface PlaybookStore {
  playbooks: Playbook[];
  activePlaybook: Playbook | null;
  addPlaybook: (playbook: Omit<Playbook, 'id' | 'version' | 'lastUpdated'>) => void;
  updatePlaybook: (id: string, playbook: Partial<Playbook>) => void;
  deletePlaybook: (id: string) => void;
  setActivePlaybook: (id: string) => void;
  getPlaybook: (id: string) => Playbook | undefined;
}

export const usePlaybookStore = create<PlaybookStore>((set, get) => ({
  playbooks: [],
  activePlaybook: null,
  addPlaybook: (playbook) => {
    const newPlaybook: Playbook = {
      ...playbook,
      id: crypto.randomUUID(),
      version: 1,
      lastUpdated: new Date(),
    };
    set((state) => ({ playbooks: [...state.playbooks, newPlaybook] }));
  },
  updatePlaybook: (id, playbook) => {
    set((state) => ({
      playbooks: state.playbooks.map((p) =>
        p.id === id
          ? {
              ...p,
              ...playbook,
              version: p.version + 1,
              lastUpdated: new Date(),
            }
          : p
      ),
    }));
  },
  deletePlaybook: (id) => {
    set((state) => ({
      playbooks: state.playbooks.filter((p) => p.id !== id),
      activePlaybook:
        state.activePlaybook?.id === id ? null : state.activePlaybook,
    }));
  },
  setActivePlaybook: (id) => {
    const playbook = get().playbooks.find((p) => p.id === id);
    if (playbook) {
      set({ activePlaybook: playbook });
    }
  },
  getPlaybook: (id) => {
    return get().playbooks.find((p) => p.id === id);
  },
})); 