import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { userReducer } from "../slices/userSlice";

//persist configration
const persistConfig = {
    key: 'root',
    storage
}

//creating a root reducer for our persist store
export const rootreducer = persistReducer(persistConfig, userReducer)
