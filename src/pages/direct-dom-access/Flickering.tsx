import React, { useEffect } from "react";
import "./styles.scss";

const Flickering = () => {
  console.log("render");

  useEffect(() => {
    async function loop() {
      let color = "black";
      while (true) {
        // eslint-disable-next-line no-loop-func
        await new Promise<void>((resolve) => {
          color = color === "black" ? "white" : "black";
          document
            .getElementById("id")
            ?.setAttribute("style", `background-color:${color}`);
          setTimeout(() => {
            resolve();
          }, 500);
        });
      }
    }
    loop();
  }, []);

  return (
    <div className="whole-screen" id="id">
      <h1>Hello</h1>
    </div>
  );
};

export default Flickering;
