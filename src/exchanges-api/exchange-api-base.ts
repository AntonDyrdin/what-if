import axios, { AxiosInstance } from "axios";
import { IPair } from "../redux/types";

export abstract class ExchangeApiBase {
  name: string;
  API: AxiosInstance;

  constructor(name: string, apiUrl: string) {
    this.name = name;
    this.API = axios.create({
      baseURL: apiUrl,
    });
  }

  abstract pairs(): Promise<IPair[]>;
}

export interface IHistoryRequest {
  history(params: {
    symbol: string;
    resolution: number; // минуты
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }>;
}
