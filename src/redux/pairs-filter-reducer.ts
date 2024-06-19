import { Slice, createSlice } from "@reduxjs/toolkit";
import store from "./store";

const FILTERS_LOCAL_STORAGE_KEY = 'pairs-filter';

export interface FiltersState {
  currencies: { name: string; selected: boolean }[];
}

export const pairsFilerSlice: Slice<FiltersState> = createSlice({
  name: "pairs-filter",
  initialState: {
    currencies: [] as { name: string; selected: boolean }[],
  },
  reducers: {
    updateFiler: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    appendCurrency: (state, action: { payload: string }) => {
      if (!action.payload) return;

      localStorage.setItem(
        FILTERS_LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...state,
          currencies: [...state.currencies, { name: action.payload, selected: true }],
        })
      )
      return {
        ...state,
        currencies: [...state.currencies, { name: action.payload, selected: true }],
      };
    },
    readFiltersFromLocalStorage(state) {
      /** чтение последних настроек фильтров из localStorage */
      const savedStateJson = localStorage.getItem(FILTERS_LOCAL_STORAGE_KEY);
      if (savedStateJson) {
        const parsedState = JSON.parse(savedStateJson) as FiltersState;
        return parsedState;
      } else {
        return state;
      }
    },
  },
});

// Функция действия генерируется на каждую функцию редюсера(reducer), определённую в createSlice
export const { updateFiler, readFiltersFromLocalStorage, appendCurrency } = pairsFilerSlice.actions;

export default pairsFilerSlice.reducer;
