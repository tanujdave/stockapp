import * as types from "../constants/ActionTypes";

export const stockDataReceived = (data = [], error = false) => ({
    type: types.STOCK_DATA_RECEIVED,
    stockData: data,
    loading: false,
    error: error
});
