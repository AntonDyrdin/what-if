import { Slice, createSlice } from "@reduxjs/toolkit";
import { pairs as exmoPairsRequest } from "../exmo-api/requests";
import { pairs as binancePairsRequest } from "../binance-api/requests";
import { pairs as okxPairsRequest } from "../okx-api/requests";
import store from "./store";

export interface IPair {
  name: string;
  visible: boolean;
}

export interface IPairsSlice {
  exchanges: IExchange[];
  filters: IFiltersState;
}

const FILTERS_LOCAL_STORAGE_KEY = "pairs-filter";

export interface ICurrency {
  name: string;
  selected: boolean;
}

export interface IFiltersState {
  currencies: ICurrency[];
}

export interface IExchange {
  name: string;
  pairs: IPair[];
}

export const pairsSlice: Slice<IPairsSlice> = createSlice({
  name: "pairs",
  initialState: {
    exchanges: [
      { name: "exmo", pairs: [] as IPair[] },
      { name: "binance", pairs: [] as IPair[] },
      { name: "okx", pairs: [] as IPair[] },
    ],
    filters: {
      currencies: [] as ICurrency[],
    },
  },
  reducers: {
    updateExchanges: (
      state,
      action: {
        payload: IExchange[];
      }
    ) => {
      return filterPairs(
        {
          ...state,
          exchanges: action.payload,
        },
        state.filters.currencies
      );
    },
    appendCurrency: (state, action: { payload: string }) => {
      if (!action.payload) return;

      const filters = {
        ...state.filters,
        currencies: [...state.filters.currencies, { name: action.payload, selected: true }],
      };

      localStorage.setItem(FILTERS_LOCAL_STORAGE_KEY, JSON.stringify(filters));
      return {
        ...state,
        filters,
      };
    },
    removeCurrency: (state, action: { payload: string }) => {
      const filters = {
        ...state.filters,
        currencies: [...state.filters.currencies.filter((c) => c.name !== action.payload)],
      };
      localStorage.setItem(FILTERS_LOCAL_STORAGE_KEY, JSON.stringify(filters));
      return {
        ...state,
        filters,
      };
    },
    flipSelection: (state, action: { payload: string }) => {
      let newState = {
        ...state,
        filters: {
          ...state.filters,
          currencies: [
            ...state.filters.currencies.map((c) =>
              c.name === action.payload
                ? {
                    ...c,
                    selected: !c.selected,
                  }
                : c
            ),
          ],
        },
      };
      localStorage.setItem(FILTERS_LOCAL_STORAGE_KEY, JSON.stringify(newState.filters));

      return filterPairs(newState, newState.filters.currencies);
    },
    readFiltersFromLocalStorage(state) {
      /** чтение последних настроек фильтров из localStorage */
      const savedStateJson = localStorage.getItem(FILTERS_LOCAL_STORAGE_KEY);
      if (savedStateJson) {
        const parsedState = JSON.parse(savedStateJson) as IFiltersState;
        return { ...state, filters: parsedState };
      } else {
        localStorage.setItem(FILTERS_LOCAL_STORAGE_KEY, JSON.stringify(state.filters));
        return state;
      }
    },
  },
});

export function loadCurrencies() {
  return async function thunk(dispatch: any, getState: any) {
    const responses = await Promise.all([
      exmoPairsRequest(),
      binancePairsRequest(),
      okxPairsRequest(),
    ]);

    dispatch(
      updateExchanges([
        {
          name: "EXMO",
          pairs: Object.entries(responses[0].data).map((s) => {
            return { name: s[0], visible: true };
          }),
        },
        {
          name: "Binance",
          pairs: responses[1].data.symbols
            .filter((s: any) => s.status === "TRADING")
            .map((s: any) => {
              return { name: s.symbol, visible: true };
            }),
        },
        {
          name: "OKX",
          pairs: responses[2].data.data
            .filter((s: any) => s.state === "live")
            .map((s: any) => {
              return { name: s.instId, visible: true };
            }),
        },
      ])
    );
  };
}

const filterPairs = (state: IPairsSlice, currencies: ICurrency[]) => {
  return {
    ...state,
    exchanges: state.exchanges.map((exchange) => ({
      ...exchange,
      pairs: exchange.pairs.map((p) => ({
        ...p,
        visible: currencies.some((pc) => pc.selected && p.name.includes(pc.name)),
      })),
    })),
  };
};

// Функция действия генерируется на каждую функцию редюсера(reducer), определённую в createSlice
export const {
  updateExchanges,
  updateFiler,
  readFiltersFromLocalStorage,
  appendCurrency,
  removeCurrency,
  flipSelection,
} = pairsSlice.actions;

export default pairsSlice.reducer;
