import { IPair } from "../redux/types";
import { ExchangeApiBase } from "./exchange-api-base";

const API_URL = "https://api.binance.com/api/v3";

export class BinanceApi extends ExchangeApiBase {
  async pairs(): Promise<IPair[]> {
    const response = await this.API.get("/exchangeInfo");
    return response.data.symbols
      .filter((s: any) => s.status === "TRADING")
      .map((s: any) => {
        return { name: s.symbol, visible: true, selected: false };
      });
  }
}

export const binanceApi = new BinanceApi("Binance", API_URL);
