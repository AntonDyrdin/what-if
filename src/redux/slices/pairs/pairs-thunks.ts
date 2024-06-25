import { pairs as exmoPairsRequest, history as exmoHistoryRequest } from "../../../exmo-api/requests";
import { pairs as binancePairsRequest } from "../../../binance-api/requests";
import { pairs as okxPairsRequest } from "../../../okx-api/requests";
import { updateExchanges, updateTimeInterval, updateTimeSerieses } from "./pairs-reducer";
import { getRandomColor } from "../../../utils";
import { RootState } from "../../store";
import { IExchange, IPair, ITimeInterval } from "../../types";

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