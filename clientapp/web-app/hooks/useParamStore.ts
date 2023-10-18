import { createWithEqualityFn } from "zustand/traditional";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
};

const initialState: State = {
  pageCount: 1,
  pageNumber: 12,
  pageSize: 1,
  searchTerm: "",
};

export const useParamsStore = createWithEqualityFn<State & Actions>()(
  (set) => ({
    ...initialState,

    setParams: (newparams: Partial<State>) => {
      set((state) => {
        if (newparams.pageNumber) {
          return { ...state, pageNumber: newparams.pageNumber };
        } else {
          return { ...state, ...newparams, pageNumber: 1 };
        }
      });
    },

    reset: () => set(initialState),
  })
);
