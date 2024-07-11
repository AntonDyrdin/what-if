import React, { memo, useCallback } from "react";
import Plot from "react-plotly.js";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { config, layout } from "./layout";
import { updateTimeSeriesesData } from "../../../redux/slices/exchanges/exchanges-thunks";
import { TTimeSeries } from "../../../redux/types";
import { Button } from "@mui/material";
import "./styles.scss";

const Chart: React.FC = () => {
  const timeSerieses = useAppSelector((state) => state.exchanges.timeSerieses);
  const timeSeriesesMap: Map<string, TTimeSeries[]> = new Map();
  timeSerieses.forEach((ts) => {
    timeSeriesesMap.set(ts.name!, [...(timeSeriesesMap.get(ts.name!) || []), ts]);
  });
  const dispatch = useAppDispatch();

  const handleRelayout = (event: any) => {
    if (event["xaxis.range[0]"] && event["xaxis.range[1]"]) {
      const start = new Date(event["xaxis.range[0]"]);
      const end = new Date(event["xaxis.range[1]"]);
      dispatch(
        updateTimeSeriesesData({
          from: start.toISOString(),
          to: end.toISOString(),
        })
      );
      console.log(start, end);
    }
  };

  const reset = useCallback(() => {
    const start = new Date();
    start.setHours(start.getHours() - 9);
    const end = new Date();
    end.setHours(end.getHours() - 6);

    dispatch(
      updateTimeSeriesesData({
        from: start.toISOString(),
        to: end.toISOString(),
      })
    );
  }, []);

  return (
    <div>
      <Button className="reset" variant="contained" onClick={reset}>
        Сбросить
      </Button>
      <div className="charts">
        {Array.from(timeSeriesesMap.values()).map((tss: TTimeSeries[], index: number) => (
          <Plot
            key={index}
            data={tss.map((ts) => ({
              ...ts,
              name: `${ts.name} ${ts.exchangeName}`,
              marker: { ...ts.marker },
            }))}
            layout={{
              ...layout,
              yaxis: { ...layout.yaxis, domain: [0, 1] },
              dragmode: "pan",
            }}
            config={config}
            style={{ width: "100%", height: "400px" }}
            onRelayout={handleRelayout}
          />
        ))}
      </div>
    </div>
  );
};

export default Chart;

// memo(() => {
//   return (
//     <Plot
//       key={index}
//       data={[{ ...ts, marker: { ...ts.marker } }]}
//       layout={{
//         ...layout,
//         xaxis: { ...layout.xaxis, domain: [0, 1] },
//         yaxis: { ...layout.yaxis, domain: [0, 1] },
//       }}
//       config={config}
//       style={{ width: "100%", height: "450px" }}
//       onRelayout={handleRelayout}
//     />
//   );
// })
