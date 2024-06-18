import { Slice, createSlice } from "@reduxjs/toolkit";

export const pairsFilerSlice: Slice<{
  value: {
    currencies: { name: string; selected: boolean }[];
  };
}> = createSlice({
  name: "pairs-filter",
  initialState: {
    value: {
      currencies: [] as { name: string; selected: boolean }[],
    },
  },
  reducers: {
    updateCurrencies: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Функция действия генерируется на каждую функцию редюсера(reducer), определённую в createSlice
export const { updateCurrencies } = pairsFilerSlice.actions;

export default pairsFilerSlice.reducer;
