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
          const v = Math.random();
          color =
            v > 0.9
              ? v > 0.99
                ? "rgba(100, 100, 100, 0.5)"
                : "rgba(10, 10, 10, 0.5)"
              : "rgba(0, 0, 0, 0.5)";
          document
            .getElementById("flash")
            ?.setAttribute("style", `background-color:${color}`);

          // if (v > 0.6 && v < 0.9) {
          //   document
          //     .getElementById("line1")
          //     ?.setAttribute("style", `top:${100 * v}%`);

          //   if (v > 0.9) {
          //     document
          //       .getElementById("line2")
          //       ?.setAttribute("style", `top:${100 * (v / 0.9 - 0.3)}%`);
          //   }
          // } else {
          //   document
          //     .getElementById("line1")
          //     ?.setAttribute("style", `display: none`);
          //   document
          //     .getElementById("line2")
          //     ?.setAttribute("style", `display: none`);
          // }

          setTimeout(() => {
            resolve();
          }, 40);
        });
      }
    }
    loop();
  }, []);

  return (
    <div className="background-image">
      <div className="whole-screen" id="flash"></div>
      <div className="line" id="line1"></div>
      <div className="line" id="line2"></div>
    </div>
  );
};

export default Flickering;
