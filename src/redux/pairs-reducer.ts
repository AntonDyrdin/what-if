import { createSlice } from "@reduxjs/toolkit";
import { pairs as exmoPairsRequest } from "../exmo-api/requests";
import { pairs as binancePairsRequest } from "../binance-api/requests";
import { pairs as okxPairsRequest } from "../okx-api/requests";

export const pairsSlice = createSlice({
  name: "pairs",
  initialState: {
    value: {
      exmo: [],
      binance: [],
      okx: [],
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
export const { updateCurrencies } = pairsSlice.actions;

export default pairsSlice.reducer;

export function loadCurrencies() {
  return async function thunk(dispatch: any, getState: any) {
    const responses = await Promise.all([
      exmoPairsRequest(),
      binancePairsRequest(),
      okxPairsRequest(),
    ]);

    dispatch(
      updateCurrencies({
        ...getState().pairs.value,
        exmo: Object.entries(responses[0].data).map((s) => s[0]),
        binance: responses[1].data.symbols
          .filter((s: any) => s.status === "TRADING")
          .map((s: any) => s.symbol),
        okx: responses[2].data.data.filter((s: any) => s.state === "live").map((s: any) => s.instId),
      })
    );
  };
}
