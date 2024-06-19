import React, { useEffect } from "react";
import { loadCurrencies } from "../../redux/pairs-reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./styles.scss";
import Panel from "./panel/Panel";

function CurrencyPairs() {
  const pairs = useAppSelector((state: any) => state.pairs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCurrencies());
  }, []);

  return (
    <div className="exchanges">
      <Panel/>
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
