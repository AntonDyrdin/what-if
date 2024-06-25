import { IPair } from "../redux/types";
import { ExchangeApiBase } from "./exchange-api-base";

const API_URL = "https://www.okx.com/api/v5";

export class OkxApi extends ExchangeApiBase {
  async pairs(): Promise<IPair[]> {
    const response = await this.API.get("/public/instruments?instType=SPOT");
    return response.data.data
    .filter((s: any) => s.state === "live")
    .map((s: any) => {
      return { name: s.instId, visible: true, selected: false };
    });
  }
}

export const okxApi = new OkxApi("OKX", API_URL);
