import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import { rootreducer } from "./reducer";

//creating a Redux Store
export const store = configureStore({
    reducer: rootreducer
})

//exporting persits store to pass to PersitsGate in index.js
export const persitor=persistStore(store)