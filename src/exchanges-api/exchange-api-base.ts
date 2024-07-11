import axios, { AxiosInstance } from "axios";
import { IPair } from "../redux/types";

export abstract class ExchangeApiBase implements IHistoryRequest {
  name: string;
  private _API: AxiosInstance;

  constructor(name: string, apiUrl: string) {
    this.name = name;
    this._API = axios.create({
      baseURL: apiUrl,
    });
  }

  get API(): AxiosInstance {
    return this._API;
  }

  abstract pairs(): Promise<IPair[]>;
  abstract history(params: {
    symbol: string;
    resolution: number;
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }>
}

export interface IHistoryRequest {
  history(params: {
    symbol: string;
    resolution: number; // минуты
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }>;
}
