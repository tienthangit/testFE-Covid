import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import loadingReducer from "./reducer/loadingReducer/loadingReducer";
import modalReducer from "./reducer/modalReducer/modalReducer";
import listDataReducer from "./reducer/tableReducer/listDataCovid";

const rootReducer = combineReducers({
    listDataReducer,
    modalReducer,
    loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
