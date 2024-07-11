import { RootState } from "./store";
import { getRandomColor } from "../utils";
import { PlotData } from "plotly.js";
import { ExchangeApiBase } from "../exchanges-api/exchange-api-base";

export interface IPair {
  id: string;
  name: string;
  visible: boolean;
  selected: boolean;
}

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
  /* ISO Date - "2023-03-10T10:00:00" */
  from: string;
  to: string;
}

export type TTimeSeries = Partial<PlotData> & { exchangeName: string; pairId: string };

export interface IExchangesSlice {
  exchanges: IExchange[];
  filters: IFiltersState;
  timeSerieses: TTimeSeries[];
  timeInterval: ITimeInterval;
}
