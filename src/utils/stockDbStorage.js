import { uniqBy, find, remove } from "lodash";

const STOCK_STORAGE_KEY = "stock_db";

const createHistoryData = (newData, historyData = []) => {
    newData.forEach(data => {
        let tickerData = find(historyData, { ticker: data.ticker });
        if (!tickerData) {
            historyData.push({
                ticker: data.ticker,
                data: [[data.time, data.price]]
            });
        } else {
            tickerData.data.push([data.time, data.price]);
            remove(historyData, { ticker: data.ticker });
            historyData.push(tickerData);
        }
    });
    return historyData;
};

const appendToLocalDB = newData => {
    let store = localStorage.getItem(STOCK_STORAGE_KEY);
    if (!store) {
        let historyData = createHistoryData(newData, []);
        localStorage.setItem(
            STOCK_STORAGE_KEY,
            JSON.stringify({
                history: historyData,
                recentStock: newData
            })
        );
        return newData;
    }

    let parseStore = JSON.parse(store);
    let recentStock = parseStore.recentStock;
    let dataWithDiff = [];
    let newRecentStock = [];

    newData.forEach(data => {
        let lastStockTicker = find(recentStock, { ticker: data.ticker });
        if (lastStockTicker) {
            let updatedData = {
                ...data,
                price_diff: parseFloat(
                    (data.price - lastStockTicker.price).toFixed(2)
                )
            };
            dataWithDiff.push(updatedData);
            remove(recentStock, { ticker: data.ticker });
            newRecentStock.push(updatedData);
        } else {
            dataWithDiff.push(data);
            newRecentStock.push(data);
        }
    });

    localStorage.setItem(
        STOCK_STORAGE_KEY,
        JSON.stringify({
            history: createHistoryData(newData, parseStore.history),
            recentStock: [...recentStock, ...newRecentStock]
        })
    );

    let updatedStore = localStorage.getItem(STOCK_STORAGE_KEY);
    let parseUpdatedStore = JSON.parse(updatedStore);
    let recentUpdatedStock = parseUpdatedStore.recentStock;

    if (dataWithDiff.length < recentUpdatedStock.length) {
        return mergeStockData(recentUpdatedStock, dataWithDiff);
    }

    return dataWithDiff;
};

const mergeStockData = (oldData, newData) => {
    return oldData
        .map(s => newData.find(t => t.ticker === s.ticker) || s)
        .concat(newData.filter(s => !oldData.find(t => t.ticker === s.ticker)));
};

const getLiveStockData = data => {
    let stockData = convertToStockObject(data);
    return appendToLocalDB(stockData);
};

const convertToStockObject = stockData => {
    let data = [];
    let currentTs = Math.round(new Date().getTime());

    stockData.forEach(row => {
        data.push({
            ticker: row[0].toUpperCase(),
            price: parseFloat(row[1].toFixed(2)),
            time: currentTs
        });
    });

    return uniqBy(data, "ticker");
};

const getHistoryStockData = ticker => {
    let store = localStorage.getItem(STOCK_STORAGE_KEY);
    let parseStore = JSON.parse(store);
    let historyData = parseStore.history;
    return find(historyData, { ticker: ticker });
};

export { getLiveStockData, getHistoryStockData };
