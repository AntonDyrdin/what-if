import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import "./styles.scss";
import {
  appendCurrency,
  flipSelection,
  readFiltersFromLocalStorage,
  removeCurrency,
} from "../../../redux/slices/pairs/pairs-reducer";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ICurrency } from "../../../redux/types";

function Panel() {
  const filterState = useAppSelector((state) => state.pairs.filters);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(readFiltersFromLocalStorage(0));
  }, [dispatch]);

  function textChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setText(event.target.value.toUpperCase());
  }

  function onAdd() {
    dispatch(appendCurrency(text));
    setText("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === "Enter") {
      dispatch(appendCurrency(text));
      setText("");
    }
  }
console.log('render Panel')
  return (
    <div className="panel">
      <div className="controls">
        <TextField
          id="outlined-basic"
          label="Валюта"
          variant="outlined"
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) => textChanged(event)}
          size="small"
          onKeyDown={onKeyDown}
        />
        <Button variant="contained" onClick={onAdd} size="small">
          +
        </Button>
      </div>
      <div className="exchange__pairs">
        {filterState.currencies.map((c: ICurrency) => (
          <div
            className={`exchange__pair ${c.selected && 'exchange__pair--active'}`}
            key={c.name}
            onClick={() => dispatch(flipSelection(c.name))}
          >
            {c.name}
            <CloseRoundedIcon fontSize="small" onClick={() => dispatch(removeCurrency(c.name))} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Panel;
