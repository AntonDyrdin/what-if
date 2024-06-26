import { ExchangeApiBase } from "./exchange-api-base";
import { exmoApi } from "../exchanges-api/exmo";
import { binanceApi } from "../exchanges-api/binance";
import { okxApi } from "../exchanges-api/okx";

export const apiInstances: ExchangeApiBase[] = [exmoApi, binanceApi, okxApi];

// Redux настойчиво не рекомендует хранить в нём несериализуемые свойства, поэтому была создана эта карта
// https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
export const apiInstancesMap: Map<string, ExchangeApiBase> = apiInstances.reduce((acc, el) => {
  acc.set(el.name, el);
  return acc;
}, new Map());
