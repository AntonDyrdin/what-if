import React, { useEffect } from "react";
import store from "../../store";
import { loadCurrencies } from "../../redux/pairs-reducer";
import { useAppSelector } from "../../hooks";
import "./styles.scss";

function CurrencyPairs() {
  const pairs = useAppSelector((state: any) => state.pairs);
  useEffect(() => {
    store.dispatch(loadCurrencies());
  }, []);

  return (
    <div className="exchanges">
      <div className="exchange exchange--green">
        <h2 className="exchange__title">EXMO</h2>
        <div className="exchange__pairs">
          {pairs &&
            pairs.exmo &&
            pairs.exmo.map((e: string) => {
              return (
                <div className="exchange__pair" key={e}>
                  {e}
                </div>
              );
            })}
        </div>
      </div>
      <div className="exchange exchange--yellow">
        <h2 className="exchange__title">Binance</h2>
        <div className="exchange__pairs">
          {pairs &&
            pairs.binance &&
            pairs.binance.map((e: string) => {
              return (
                <div className="exchange__pair" key={e}>
                  {e}
                </div>
              );
            })}
        </div>
      </div>
      <div className="exchange exchange--white">
        <h2 className="exchange__title">OKX</h2>
        <div className="exchange__pairs">
          {pairs &&
            pairs.okx &&
            pairs.okx.map((e: string) => {
              return (
                <div className="exchange__pair" key={e}>
                  {e}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CurrencyPairs;
