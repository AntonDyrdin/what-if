import React, { useEffect } from "react";
import { IExchange, IPair, loadCurrencies } from "../../redux/pairs-reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./styles.scss";
import Panel from "./panel/Panel";

function CurrencyPairs() {
  const exchanges = useAppSelector((state: any) => state.pairs.exchanges);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCurrencies());
  }, []);

  return (
    <div className="exchanges">
      <Panel />
      {exchanges && exchanges.map((exchange: IExchange) => (
        <div className="exchange exchange--green" key={exchange.name}>
          <h2 className="exchange__title">{exchange.name}</h2>
          <div className="exchange__pairs">
            {exchange.pairs &&
              exchange.pairs
                .filter((p: IPair) => p.visible)
                .map((p: IPair) => {
                  return (
                    <div className="exchange__pair" key={p.name}>
                      {p.name}
                    </div>
                  );
                })}
          </div>
        </div>
      ))}
      {/* // <div className="exchange exchange--yellow">
      //   <h2 className="exchange__title">Binance</h2>
      //   <div className="exchange__pairs">
      //     {pairs &&
      //       pairs.binance &&
      //       pairs.binance
      //         .filter((p: IPair) => p.visible)
      //         .map((p: IPair) => {
      //           return (
      //             <div className="exchange__pair" key={p.name}>
      //               {p.name}
      //             </div>
      //           );
      //         })}
      //   </div>
      // </div>
      // <div className="exchange exchange--white">
      //   <h2 className="exchange__title">OKX</h2>
      //   <div className="exchange__pairs">
      //     {pairs &&
      //       pairs.okx &&
      //       pairs.okx
      //         .filter((p: IPair) => p.visible)
      //         .map((p: IPair) => {
      //           return (
      //             <div className="exchange__pair" key={p.name}>
      //               {p.name}
      //             </div>
      //           );
      //         })}
      //   </div>
      // </div> */}
    </div>
  );
}

export default CurrencyPairs;
