import { stockDataReceived } from "../actions";
import { getLiveStockData } from "../utils/stockDbStorage";

const setupSocket = dispatch => {
    const socket = new WebSocket("ws://stocks.mnet.website");
    socket.onopen = () => {
        console.log("Socket connection open");
    };
    socket.onmessage = event => {
        const data = JSON.parse(event.data);
        let stockData = getLiveStockData(data);
        dispatch(stockDataReceived(stockData));
    };
    socket.onerror = event => {
        dispatch(stockDataReceived([], "Error in fetching stock data"));
    };
    return socket;
};

export default setupSocket;
