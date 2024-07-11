import { IPair } from "../redux/types";
import { ExchangeApiBase, IHistoryRequest } from "./exchange-api-base";

const API_URL = "https://api.binance.com";

export class BinanceApi extends ExchangeApiBase implements IHistoryRequest {
  async pairs(): Promise<IPair[]> {
    const response = await this.API.get("/api/v3/exchangeInfo");
    return response.data.symbols
      .filter((s: any) => s.status === "TRADING")
      .map((s: any) => {
        return {
          name: `${s.baseAsset}/${s.quoteAsset}`,
          id: s.symbol,
          visible: true,
          selected: false,
        };
      });
  }

  async history(params: {
    symbol: string;
    resolution: number;
    from: Date;
    to: Date;
  }): Promise<{ x: string[]; y: number[] }> {
    const resolutionMap: { [key: number]: string } = {
      1: "1s",
      60: "1m",
      180: "3m",
      300: "5m",
      900: "15m",
      1800: "30m",
      3600: "1h",
      7200: "2h",
      14400: "4h",
      21600: "6h",
      28800: "8h",
      43200: "12h",
      86400: "1d",
      259200: "3d",
      604800: "1w",
      2592000: "1M",
    };

    const interval = resolutionMap[params.resolution * 60];

    if (!interval) {
      throw new Error(`Unsupported resolution: ${params.resolution}`);
    }

    const response = await this.API.get("/api/v3/klines", {
      params: {
        symbol: params.symbol,
        interval,
        startTime: params.from.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        endTime: params.to.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        limit: 1000,
      },
    });

    if (response.data && Array.isArray(response.data)) {
      return {
        x: response.data.map((kline: any) => new Date(kline[0]).toISOString()),
        y: response.data.map((kline: any) => parseFloat(kline[4])),
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

export const binanceApi = new BinanceApi("Binance", API_URL);
