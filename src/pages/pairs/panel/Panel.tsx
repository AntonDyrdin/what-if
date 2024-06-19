import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import "./styles.scss";
import {
  appendCurrency,
  readFiltersFromLocalStorage,
} from "../../../redux/pairs-filter-reducer";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Panel() {
  const filterState = useSelector((state) => (state as any).pairsFilter);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(readFiltersFromLocalStorage(0));
  }, []);

  function textChanged(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.target.value) {
      setText(event.target.value);
    }
  }

  function onAdd() {
    dispatch(appendCurrency(text));
  }

  return (
    <div className="panel">
      <div className="controls">
        <TextField
          id="outlined-basic"
          label="Валюта"
          variant="outlined"
          onChange={(event) => textChanged(event)}
          size="small"
        />
        <Button
          variant="contained"
          onClick={onAdd}
          size="small"
        >
          +
        </Button>
      </div>
      <div className="exchange__pairs">
        {filterState.currencies.map((c: any) => (
          <div className="exchange__pair" key={c.name}>
            {c.name}
            <CloseRoundedIcon fontSize="small"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Panel;
