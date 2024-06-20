import React, { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { Layout, Config, PlotData } from "plotly.js";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { loadHistory } from "../../../redux/pairs-reducer";

const Chart: React.FC = () => {
  const timeSerieses = useAppSelector((state: any) => state.pairs.timeSerieses);
  const dispatch = useAppDispatch();
  const protRef = useRef<any>();
  const [layout, setLayout] = useState<Partial<Layout>>({
    xaxis: {
      type: "date",
      tickfont: {
        color: "white",
      },
      gridcolor: "rgba(255, 255, 255, 0.2)",
    },
    yaxis: {
      tickfont: {
        color: "white",
      },
      gridcolor: "rgba(255, 255, 255, 0.2)",
    },
    plot_bgcolor: "#1f1f1f",
    paper_bgcolor: "#1f1f1f",
    font: {
      color: "white",
    },
    showlegend: true,
    autosize: true,
    margin: { t: 20, b: 40, l: 40, r: 20 },
  });

  const [config] = useState<Partial<Config>>({
    responsive: true,
    scrollZoom: true,
    displayModeBar: true,
    displaylogo: false,
  });

  useEffect(() => {
    dispatch(
      loadHistory(
        new Date("2023-03-10T10:00:00"),
        new Date("2023-03-10T11:00:00")
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      timeSerieses.length > 0 &&
      document &&
      document.querySelector('[data-title="Autoscale"]')
    ) {
      setTimeout(
        () =>
          (
            document.querySelector(
              '[data-title="Autoscale"]'
            ) as HTMLButtonElement
          ).click(),
        1000
      );
    }
  }, [timeSerieses]);

  return (
    <Plot
      ref={protRef}
      data={timeSerieses}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Chart;
