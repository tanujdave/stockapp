import React from "react";
import classNames from "classnames/bind";
import { timeAgo } from "../utils/timeAgo";
import StockChart from "../components/StockChart";
import { getHistoryStockData } from "../utils/stockDbStorage";

class TickerList extends React.Component {

    handleSelectTicker = e => {
        e.preventDefault();
        const { data } = this.props;
        this.props.toggleStockChart(data.ticker);
    };

    render() {
        const { data, selectedTicker } = this.props;

        let priceDiffCs = classNames({
            "diff-button": true,
            up: data.price_diff > 0,
            down: data.price_diff < 0
        });

        let arrowCs = classNames({
            up: data.price_diff > 0,
            down: data.price_diff < 0
		});
		
		let tickerCs = classNames({
			pu: true,
			rs: true,
			xj: true,
			ux: true,
			selected: data.ticker === selectedTicker
		});

        return (
            <React.Fragment>
                <a
                    className={tickerCs}
                    onClick={this.handleSelectTicker}
                >
                    <span className="awy">{data.ticker}</span>
                    <span className="awy text-right">
                        ${data.price}
                        <br />
                        <span className="time">{timeAgo(data.time)}</span>
                    </span>
                    <span>
                        <span className={arrowCs} />
                    </span>
                    <span className="awy text-right">
                        {data.price_diff && (
                            <button className={priceDiffCs}>
                                {data.price_diff}
                            </button>
                        )}
                    </span>
                </a>
                {data.ticker === selectedTicker && (
                    <a className={tickerCs}>
                        <StockChart data={getHistoryStockData(data.ticker)} />
                    </a>
                )}
            </React.Fragment>
        );
    }
}

export default TickerList;
