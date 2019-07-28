import React from "react";
import { connect } from "react-redux";
import TickerList from "../components/TickerList";

const LoadingList = () => {
    return (
        <a className="pu rs xj ux">
            <span className="awy">Loading...</span>
        </a>
    );
};

const LoadingError = (error) => {
    return (
        <a className="pu rs xj ux">
            <span className="awy">{error.error}</span>
        </a>
    );
};

class StockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTicker: null
        };
    }

    toggleStockChart = ticker => {
        if (this.state.selectedTicker === ticker) {
            this.setState({
                ...this.state,
                selectedTicker: null
            });
            return;
        }
        this.setState({
            ...this.state,
            selectedTicker: ticker
        });
    };

    render() {
        const { liveData, loading, error } = this.props;

        return (
            <React.Fragment>
                <div className="container stock-table">
                    <div className="fc afr">
                        <div className="by afd">
                            <h6 className="aya">Live stock</h6>
                            {loading && <LoadingList />}
                            {error && <LoadingError error={error} />}
                            {liveData &&
                                liveData.map(data => (
                                    <TickerList
										key={data.ticker}
                                        data={data}
                                        selectedTicker={
                                            this.state.selectedTicker
                                        }
                                        toggleStockChart={this.toggleStockChart}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        liveData: state.stock.liveData,
        loading: state.stock.loading,
        error: state.stock.error
    };
};

export default connect(
    mapStateToProps,
    {}
)(StockPage);
