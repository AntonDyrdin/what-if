import { API } from "./axios-instance";

export async function pairs(): Promise<any> {
  return API.get('/ticker');
}

export async function history(params: {
  symbol: string,
  resolution: number, // минуты
  from: Date,
  to: Date
}): Promise<any> {
  return API.get('/candles_history', {
    params: {
      symbol: params.symbol,
      resolution: params.resolution,
      from: Math.round(params.from.getTime() / 1000) + 60 * 60 * 3,
      to: Math.round(params.to.getTime() / 1000) + 60 * 60 * 3
    }
  });
}
