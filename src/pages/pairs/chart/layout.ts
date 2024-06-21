import { Config, Layout } from "plotly.js";

export const layout: Partial<Layout> = {
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
};

export const config: Partial<Config> = {
  responsive: true,
  scrollZoom: true,
  displayModeBar: true,
  displaylogo: false,
};
