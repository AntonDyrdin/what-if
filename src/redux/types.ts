import { RootState } from "./store";
import { getRandomColor } from "../utils";
import { PlotData } from "plotly.js";

export interface IPair {
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
