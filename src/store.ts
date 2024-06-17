import { configureStore } from '@reduxjs/toolkit'
import {ThunkMiddleware} from 'redux-thunk'

const store = configureStore({
  reducer: {
    pairs: pairsReducer,
  },
  middleware: [ThunkMiddleware]
},)

export default store;

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>
// Выведенные типы: {pairs: PairsState}
export type AppDispatch = typeof store.dispatch