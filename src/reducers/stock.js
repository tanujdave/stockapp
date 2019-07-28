import * as types from "../constants/ActionTypes";

const mergeStockData = (oldData, newData) => {
    return oldData
        .map(s => newData.find(t => t.ticker === s.ticker) || s)
        .concat(newData.filter(s => !oldData.find(t => t.ticker === s.ticker)));
};

const initialState = {
    liveData: [],
    loading: true,
    error: false
};

const stock = (state = initialState, action) => {
    switch (action.type) {
        case types.STOCK_DATA_RECEIVED:
            return {
                ...state,
                liveData: state.liveData
                    ? mergeStockData(state.liveData, action.stockData)
                    : action.stockData,
                loading: action.loading,
                error: action.error
            };
        default:
            return state;
    }
};

export default stock;
