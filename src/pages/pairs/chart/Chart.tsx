import React from "react";
import Plot from "react-plotly.js";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import {
  updateTimeSeriesesData,
} from "../../../redux/pairs-reducer";
import { config, layout } from "./layout";
import { PlotData } from "plotly.js";

const Chart: React.FC = () => {
  const timeSerieses = useAppSelector((state: any) => state.pairs.timeSerieses);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     loadHistory(
  //       "BTC_USD",
  //       new Date("2023-03-10T10:00:00"),
  //       new Date("2023-03-10T19:00:00")
  //     )
  //   );
  // }, [dispatch]);

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
