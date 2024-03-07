// import { configureStore } from "@reduxjs/toolkit";
// import tokenReducer from "./TokenSlice";

// let store = configureStore({
// reducer: {
//     token: tokenReducer,
// },
// });

// export default store;

import { configureStore} from "@reduxjs/toolkit";
import tokenReducer from "./TokenSlice";

export type RootState = ReturnType<typeof store.getState>;

let store = configureStore({
reducer: {
    token: tokenReducer,
},
});

export default store;


