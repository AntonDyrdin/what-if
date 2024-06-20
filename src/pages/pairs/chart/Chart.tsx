import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { Layout, Config } from "plotly.js";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { loadHistory } from "../../../redux/pairs-reducer";

const Chart: React.FC = () => {
  const timeSerieses = useAppSelector((state: any) => state.pairs.timeSerieses);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      loadHistory(
        new Date("2023-03-10T10:00:00"),
        new Date("2023-03-10T11:00:00")
      )
    );
  }, [dispatch]);

  const layout: Partial<Layout> = {
    xaxis: {
      type: "date",
      tickfont: {
        color: "white", // Цвет меток на оси X
      },
      gridcolor: "rgba(255, 255, 255, 0.2)", // Цвет сетки оси X
    },
    yaxis: {
      tickfont: {
        color: "white", // Цвет меток на оси Y
      },
      gridcolor: "rgba(255, 255, 255, 0.2)", // Цвет сетки оси Y
    },
    plot_bgcolor: "#1f1f1f", // Цвет фона графика
    paper_bgcolor: "#1f1f1f", // Цвет фона области за графиком
    font: {
      color: "white", // Цвет текста на графике
    },
    showlegend: true,
    autosize: true,
    margin: { t: 20, b: 40, l: 40, r: 20 }, // Задаем отступы по краям графика
    // Устанавливаем начальные значения диапазона осей
  };

  const config: Partial<Config> = {
    responsive: true,
    scrollZoom: true,
    displayModeBar: true,
    displaylogo: false,
  };
  console.log(timeSerieses);

  return (
    <Plot
      data={[...timeSerieses]}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Chart;
