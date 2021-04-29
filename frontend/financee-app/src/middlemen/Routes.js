import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import {
	Home,
	TradeCalculator,
	Tradebills,
	TradebillDetail,
	Notes,
	NoteDetail,
	StockLookup,
	Watchlist,
	Login,
	Register,
	PageNotFound,
} from "./imports";
import WatchlistDetail from "../components/WatchlistDetail";

function Routes() {
	// Trade Calculator variables
	const [symbol, setSymbol] = useState("");
	const [risk, setRisk] = useState("");
	const [capital, setCapital] = useState("");
	const [totalRisk, setTotalRisk] = useState("");
	const [price, setPrice] = useState("");
	const [stopLoss, setStopLoss] = useState("");
	const [result, setResult] = useState(0);
	const [options, setOptions] = useState([]);

    // API keys
    const twelvedata_key = process.env.REACT_APP_TWELVEDATA_KEY

	// When the app renders, this is run. This gets all stock symbols from NASDAQ, NYSE, and OTC exchanges
	useEffect(() => {
		// Resetting the options
		setOptions([]);

		// Three requests to get stocks from three exchanges
		const requestOne = axios.get(
			`https://api.twelvedata.com/stocks?apikey=${twelvedata_key}&type=Common+Stock&exchange=NASDAQ`
		);
		const requestTwo = axios.get(
			`https://api.twelvedata.com/stocks?apikey=${twelvedata_key}&type=Common+Stock&exchange=NYSE`
		);
		const requestThree = axios.get(
			`https://api.twelvedata.com/stocks?apikey=${twelvedata_key}&type=Common+Stock&exchange=OTC`
		);

		// Running the reequests
		axios
			.all([requestOne, requestTwo, requestThree])
			.then(
				axios.spread((...responses) => {
					const responseOne = responses[0];
					const responseTwo = responses[1];
					const responseThree = responses[2];

					// Looping over all the response data and pushing it to options list using appropriate format with symbol and name
					let options = [];
					let data = responseOne.data.data;
					data.forEach((element) => {
						options.push({
							value: element.symbol + "-" + element.name,
						});
					});

					data = responseTwo.data.data;
					data.forEach((element) => {
						options.push({
							value: element.symbol + "-" + element.name,
						});
					});

					data = responseThree.data.data;
					data.forEach((element) => {
						options.push({
							value: element.symbol + "-" + element.name,
						});
					});

					// Setting the state with the options array
					setOptions([...options]);
				})
			)
			.catch((errors) => {
				console.log(errors);
			});
	}, []);

	return (
		<Switch>
			<Route exact path="/" component={Home} />

			<Route exact path="/login" component={Login} />

			<Route exact path="/register" component={Register} />

			{/* Passing all state variables and their functions to component, except for setOptions as its not used */}
			<Route
				exact
				path="/trade-calculator"
				render={() => (
					<TradeCalculator
						symbol={symbol}
						setSymbol={setSymbol}
						options={options}
						risk={risk}
						setRisk={setRisk}
						capital={capital}
						setCapital={setCapital}
						totalRisk={totalRisk}
						setTotalRisk={setTotalRisk}
						price={price}
						setPrice={setPrice}
						stopLoss={stopLoss}
						setStopLoss={setStopLoss}
						result={result}
						setResult={setResult}
					/>
				)}
			/>

			<Route exact path="/tradebills" component={Tradebills} />

			<Route
				exact
				path="/tradebills/:tradebill_id"
				render={() => <TradebillDetail options={options} />}
			/>

			<Route exact path="/notes" component={Notes} />

			<Route exact path="/notes/:note_id" component={NoteDetail} />

			<Route
				exact
				path="/stock-lookup"
				render={() => <StockLookup options={options} />}
			/>

			<Route exact path="/watchlist" component={Watchlist} />

			<Route
				exact
				path="/watchlist/:watchlist_id"
				component={WatchlistDetail}
			/>

			<Route component={PageNotFound} />
		</Switch>
	);
}

export default Routes;
