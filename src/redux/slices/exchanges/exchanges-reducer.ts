import { Slice, createSlice } from "@reduxjs/toolkit";
import { PlotData } from "plotly.js";
import {
  IExchangesSlice,
  IPair,
  ICurrency,
  IExchange,
  IFiltersState,
  ITimeInterval,
  TTimeSeries,
} from "../../types";
import { FILTERS_LOCAL_STORAGE_KEY } from "../../constants";
import { apiInstances } from "../../../exchanges-api/api-instances";

export const exchangesSlice: Slice<IExchangesSlice> = createSlice({
  name: "exchanges",
  initialState: {
    exchanges: apiInstances.map((apiInstance) => ({ name: apiInstance.name, pairs: [] as IPair[] })),
    filters: {
      currencies: [] as ICurrency[],
    },
    timeSerieses: [] as TTimeSeries[],
    timeInterval: {
      from: "2024-06-10T10:00:00",
      to: "2024-06-10T19:00:00",
    },
  },
  reducers: {
    updateTimeInterval: (state, action: { payload: ITimeInterval }) => {
      // Immer
      state.timeInterval = action.payload;
      return state;
    },
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
      return filterPairs(
        {
          ...state,
          filters,
        },
        filters.currencies
      );
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
    updateTimeSerieses(state, action: { payload: TTimeSeries[] }) {
      return {
        ...state,
        timeSerieses: action.payload,
      };
    },
  },
});

const filterPairs = (state: IExchangesSlice, currencies: ICurrency[]) => {
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
  updateTimeSerieses,
  updateTimeInterval,
} = exchangesSlice.actions;

export default exchangesSlice.reducer;
