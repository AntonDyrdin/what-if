import { updateExchanges, updateTimeInterval, updateTimeSerieses } from "./exchanges-reducer";
import { getRandomColor } from "../../../utils";
import { RootState } from "../../store";
import { IExchange, IPair, ITimeInterval } from "../../types";
import { apiInstances, apiInstancesMap } from "../../../exchanges-api/api-instances";

export function loadCurrencies() {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const responses = await Promise.all(apiInstances.map((api) => api.pairs()));

    dispatch(
      updateExchanges(
        getState().exchanges.exchanges.map((exchange, index) => ({
          ...exchange,
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
      dispatch(updateTimeSerieses([...state.timeSerieses.filter((ts) => ts.name !== pair.name && ts.exchangeName !== exchange.name)]));
    } else {
      const timeSeries = state.timeSerieses.find((ts) => ts.name === pair.name && ts.exchangeName === exchange.name);
      if (!timeSeries) {
        dispatch(
          updateTimeSerieses([
            ...state.timeSerieses,
            {
              exchangeName: exchange.name,
              pairId: pair.id,
              x: [],
              y: [],
              name: pair.name,
              type: "scatter",
              mode: "lines",
              marker: { color: getRandomColor() },
            },
          ])
        );
        dispatch(loadHistory(exchange.name, pair.id));
      }
    }
  };
}

export function loadHistory(exchangeName: string, symbol: string) {
  return async function thunk(dispatch: any, getState: () => RootState) {
    const response = await apiInstancesMap.get(exchangeName)!.history({
      symbol,
      resolution: 1,
      from: new Date(getState().exchanges.timeInterval.from),
      to: new Date(getState().exchanges.timeInterval.to),
    });

    dispatch(
      updateTimeSerieses(
        getState().exchanges.timeSerieses.map((timeSeries) =>
          timeSeries.pairId === symbol
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
        dispatch(loadHistory(ts.exchangeName, ts.pairId));
      }
    });
  };
}
