import { configureStore } from '@reduxjs/toolkit'
import pairsReducer from './pairs-reducer';
import pairsFilterReducer from './pairs-filter-reducer';

const store = configureStore({
  reducer: {
    pairs: pairsReducer,
    pairsFilter: pairsFilterReducer,
  },
},)

export default store;

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>
// Выведенные типы: {pairs: PairsState}
export type AppDispatch = typeof store.dispatch