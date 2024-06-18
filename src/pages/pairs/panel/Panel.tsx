import React, { useEffect } from "react";
import store from "../../../store";
import { useAppSelector } from "../../../hooks";
import "./styles.scss";

function Panel() {
  const pairs = useAppSelector((state: any) => state.pairs);
  useEffect(() => {
  }, []);

  return (
    <></>
  );
}

export default Panel;
