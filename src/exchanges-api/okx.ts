import { IPair } from "../redux/types";
import { ExchangeApiBase } from "./exchange-api-base";

const API_URL = "https://www.okx.com";

export class OkxApi extends ExchangeApiBase {
  async pairs(): Promise<IPair[]> {
    const response = await this.API.get("/api/v5/public/instruments?instType=SPOT");
    return response.data.data
      .filter((s: any) => s.state === "live")
      .map((s: any) => {
        return { name: s.instId.replace("-", "/"), id: s.instId, visible: true, selected: false };
      });
  }

  async history(params: {
    symbol: string;
    resolution: number;
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }> {
    const resolutionMap: { [key: number]: string } = {
      60: "1m",
      180: "3m",
      300: "5m",
      900: "15m",
      1800: "30m",
      3600: "1H",
      7200: "2H",
      14400: "4H",
      21600: "6H",
      43200: "12H",
      86400: "1D",
      604800: "1W",
      2592000: "1M",
    };

    const bar = resolutionMap[params.resolution * 60];

    if (!bar) {
      throw new Error(`Unsupported resolution: ${params.resolution}`);
    }

    const response = await this.API.get("/api/v5/market/history-candles", {
      params: {
        instId: params.symbol,
        bar,
        before:( params.from.getTime() - new Date().getTimezoneOffset() * 60* 1000).toString(),
        after: (params.to.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toString(),
        limit: "100",
      },
    });

    if (response.data && response.data.code === "0" && Array.isArray(response.data.data)) {
      return {
        x: response.data.data.map((candle: any) => new Date(parseInt(candle[0])).toISOString()),
        y: response.data.data.map((candle: any) => parseFloat(candle[4])),
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

export const okxApi = new OkxApi("OKX", API_URL);
