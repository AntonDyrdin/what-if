import React from "react";
import Plot from "react-plotly.js";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { config, layout } from "./layout";
import { PlotData } from "plotly.js";
import { updateTimeSeriesesData } from "../../../redux/slices/exchanges/exchanges-thunks";

const Chart: React.FC = () => {
  const timeSerieses = useAppSelector((state: any) => state.exchanges.timeSerieses);
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
    }
  };

  return (
    <Plot
      data={[
        ...timeSerieses.map((ts: Partial<PlotData>) => ({
          ...ts,
          marker: { ...ts.marker },
        })),
      ]}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "450px" }}
      onRelayout={handleRelayout}
    />
  );
};

export default Chart;
