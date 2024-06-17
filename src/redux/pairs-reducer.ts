import { createSlice } from '@reduxjs/toolkit'
import { pairs as exmoPairs  } from '../exmo-api/requests';
// import { pairs as exmoPairs  } from '../exmo-api/requests';

export const pairsReducer = createSlice({
  name: 'pairs',
  initialState: {
    value: {
      exmo: [],
      binance: [],
      okx: [],
    },
  },
  reducers: {
    loadCurrencies: (state) => {
      return {
        ...state,
        pairs: {exmo: exmoPairs(),
          binance: 
      };
      // const historyUrl = `${EXMO_API}/candles_history?symbol=USDT_RUB&resolution=1&from={from_time}&to={current_time}`
    },
  },
})

// Функция действия генерируется на каждую функцию редюсера(reducer), определённую в createSlice
export const { loadCurrencies } = pairsReducer.actions

export default pairsReducer.reducer