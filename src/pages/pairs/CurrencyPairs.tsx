import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./styles.scss";
import Panel from "./panel/Panel";
import Chart from "./chart/Chart";
import { IExchange, IPair } from "../../redux/types";
import { loadCurrencies, togglePair } from "../../redux/slices/pairs/pairs-thunks";

function CurrencyPairs() {
  const exchanges = useAppSelector((state: any) => state.pairs.exchanges);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrencies());
  }, [dispatch]);

  function onPairClicked(exchange: IExchange, pair: IPair) {
    dispatch(togglePair(exchange, pair));
  }

  return (
    <div className="exchanges">
      <Panel />
      <Chart />
      {exchanges &&
        exchanges.map((exchange: IExchange) => (
          <div className="exchange exchange--green" key={exchange.name}>
            <h2 className="exchange__title">{exchange.name}</h2>
            <div className="exchange__pairs">
              {exchange.pairs &&
                exchange.pairs
                  .filter((p: IPair) => p.visible)
                  .map((p: IPair) => {
                    return (
                      <div
                        className={`exchange__pair ${
                          p.selected && "exchange__pair--active"
                        }`}
                        key={p.name}
                        onClick={() => onPairClicked(exchange, p)}
                      >
                        {p.name}
                      </div>
                    );
                  })}
            </div>
          </div>
        ))}
    </div>
  );
}

export default CurrencyPairs;
