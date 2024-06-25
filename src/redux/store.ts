import { configureStore } from '@reduxjs/toolkit'
import exchangesReducer from './slices/exchanges/exchanges-reducer';

const store = configureStore({
  reducer: {
    exchanges: exchangesReducer,
  },
},)

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch