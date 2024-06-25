import { updateExchanges, updateTimeInterval, updateTimeSerieses } from "./exchanges-reducer";
import { getRandomColor } from "../../../utils";
import { RootState } from "../../store";
import { IExchange, IPair, ITimeInterval } from "../../types";
import { exmoApi } from "../../../exchanges-api/exmo";

export function loadCurrencies() {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const responses = await Promise.all(
      getState().exchanges.exchanges.map((exchange) => exchange.pairs)
    );

    dispatch(
      updateExchanges(
        getState().exchanges.exchanges.map((exchange, index) => ({
          name: exchange.name,
          pairs: responses[index],
        }))
      )
    );
  };
}

export function togglePair(exchange: IExchange, pair: IPair) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const state = getState().exchanges;
    dispatch(
      updateExchanges(
        state.exchanges.map((e) =>
          e === exchange
            ? {
                ...e,
                pairs: e.pairs.map((p) =>
                  p === pair
                    ? {
                        ...p,
                        selected: !p.selected,
                      }
                    : p
                ),
              }
            : e
        )
      )
    );

    // выше была произведена инверсия этого флага
    if (pair.selected) {
      dispatch(updateTimeSerieses([...state.timeSerieses.filter((ts) => ts.name !== pair.name)]));
    } else {
      const timeSeries = state.timeSerieses.find((ts) => ts.name === pair.name);
      if (!timeSeries) {
        dispatch(
          updateTimeSerieses([
            ...state.timeSerieses,
            {
              x: [],
              y: [],
              name: pair.name,
              type: "scatter",
              mode: "lines",
              marker: { color: getRandomColor() },
            },
          ])
        );
        dispatch(loadHistory(pair.name));
      }
    }
  };
}

export function loadHistory(symbol: string) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const response = await exmoApi.history({
      symbol,
      resolution: 1,
      from: new Date(getState().exchanges.timeInterval.from),
      to: new Date(getState().exchanges.timeInterval.to),
    });

    dispatch(
      updateTimeSerieses(
        getState().exchanges.timeSerieses.map((timeSeries) =>
          timeSeries.name === symbol
            ? {
                ...timeSeries,
                ...response,
              }
            : timeSeries
        )
      )
    );
  };
}

export function updateTimeSeriesesData(timeInterval: ITimeInterval) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    dispatch(updateTimeInterval(timeInterval));

    getState().exchanges.timeSerieses.forEach((ts) => {
      if (ts.name) {
        dispatch(loadHistory(ts.name));
      }
    });
  };
}
