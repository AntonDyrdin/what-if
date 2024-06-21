import { Slice, createSlice } from "@reduxjs/toolkit";
import { pairs as exmoPairsRequest, history as exmoHistoryRequest } from "../exmo-api/requests";
import { pairs as binancePairsRequest } from "../binance-api/requests";
import { pairs as okxPairsRequest } from "../okx-api/requests";
import { PlotData } from "plotly.js";
import { RootState } from "./store";
import { getRandomColor } from "../utils";

export interface IPair {
  name: string;
  visible: boolean;
  selected: boolean;
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

export interface ITimeInterval {
  // ISO Date - "2023-03-10T10:00:00"
  from: string;
  to: string;
}
export interface IPairsSlice {
  exchanges: IExchange[];
  filters: IFiltersState;
  timeSerieses: Partial<PlotData>[];
  timeInterval: ITimeInterval;
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
    timeSerieses: [] as Partial<PlotData>[],
    timeInterval: {
      from: "2023-03-10T10:00:00",
      to: "2023-03-10T19:00:00"
    }
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
    updateTimeSerieses(state, action: { payload: Partial<PlotData>[] }) {
      return {
        ...state,
        timeSerieses: action.payload,
      };
    }
  },
});

export function loadCurrencies() {
  return async function thunk(dispatch: any) {
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
            return { name: s[0], visible: true, selected: false };
          }),
        },
        {
          name: "Binance",
          pairs: responses[1].data.symbols
            .filter((s: any) => s.status === "TRADING")
            .map((s: any) => {
              return { name: s.symbol, visible: true, selected: false };
            }),
        },
        {
          name: "OKX",
          pairs: responses[2].data.data
            .filter((s: any) => s.state === "live")
            .map((s: any) => {
              return { name: s.instId, visible: true, selected: false };
            }),
        },
      ])
    );
  };
}

export function togglePair(exchange: IExchange, pair: IPair) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const state = getState().pairs;
    dispatch(updateExchanges(state.exchanges.map((e) => e === exchange ? {
      ...e,
      pairs: e.pairs.map((p) => p === pair ? {
        ...p,
        selected: !p.selected
      } : p)
    } : e)));

    // выше была произведена инверсия этого флага
    if (pair.selected) {
      dispatch(updateTimeSerieses([...state.timeSerieses.filter((ts) => ts.name !== pair.name)]))
    } else {
      const timeSeries = state.timeSerieses.find((ts) => ts.name === pair.name);
      if (!timeSeries) {
        dispatch(updateTimeSerieses([...state.timeSerieses, {
          x: [],
          y: [],
          name: pair.name,
          type: 'scatter',
          mode: 'lines',
          marker: { color: getRandomColor() },
        }]))
        dispatch(loadHistory(pair.name));
      }
    }
  }
}

export function loadHistory(symbol: string) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const response = await exmoHistoryRequest({
      symbol,
      resolution: 1,
      from: new Date(getState().pairs.timeInterval.from),
      to: new Date(getState().pairs.timeInterval.to),
    });

    if (response.data.candles) {
      dispatch(updateTimeSerieses(getState().pairs.timeSerieses.map((timeSeries) => (timeSeries.name === symbol ? {
        ...timeSeries,
        x: response.data.candles.map((c: any) => (new Date(c.t)).toISOString()),
        y: response.data.candles.map((c: any) => c.c),
      } : timeSeries))));
    } else {
      console.error(response.data)
    }
  };
}

export function updateTimeSeriesesData(timeInterval: ITimeInterval) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    dispatch(updateTimeInterval(timeInterval));

    getState().pairs.timeSerieses.forEach((ts) => {
      if (ts.name) {
        dispatch(loadHistory(ts.name));
      }
    })
  }
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
  updateTimeSerieses,
  updateTimeInterval,
} = pairsSlice.actions;

export default pairsSlice.reducer;
