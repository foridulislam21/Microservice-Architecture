import { createWithEqualityFn } from "zustand/traditional";

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
  searchValue: string;
  orderBy: string;
  filterBy: string;
  seller?: string;
  winner?: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
  setSerachValue: (value: string) => void;
};

const initialState: State = {
  pageCount: 1,
  pageNumber: 1,
  pageSize: 12,
  searchTerm: "",
  searchValue: "",
  orderBy: "make",
  filterBy: "live",
  seller: undefined,
  winner: undefined,
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

    setSerachValue: (value: string) => {
      set({ searchValue: value });
    },
  })
);
