import { IPair } from "../redux/types";
import { ExchangeApiBase, IHistoryRequest } from "./exchange-api-base";

const API_URL = "https://api.exmo.me/v1.1";

export class ExmoApi extends ExchangeApiBase implements IHistoryRequest {
  async pairs(): Promise<IPair[]> {
    const response = await this.API.get("/ticker");
    return Object.entries(response.data).map((s) => {
      return { name: s[0], visible: true, selected: false };
    });
  }

  async history(params: {
    symbol: string;
    resolution: number;
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }> {
    const response = await this.API.get("/candles_history", {
      params: {
        symbol: params.symbol,
        resolution: params.resolution,
        from: Math.round(params.from.getTime() / 1000) + 60 * 60 * 3,
        to: Math.round(params.to.getTime() / 1000) + 60 * 60 * 3,
      },
    });

    if (response.data.candles) {
      return {
        x: response.data.candles.map((c: any) => new Date(c.t).toISOString()),
        y: response.data.candles.map((c: any) => c.c),
      };
    } else {
      console.error(response.data);
      return {
        x: [],
        y: [],
      };
    }
  }
}

export const exmoApi = new ExmoApi("EXMO", API_URL);
