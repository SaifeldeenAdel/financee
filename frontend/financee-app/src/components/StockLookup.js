import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { GridLoader } from "react-spinners";

import {
    MainContainer,
    Heading,
    Seperator,
} from "./styles/Main-styles";

import {
	AutoCompleteSearch,
	ChartContainer,
	Details,
	Price,
	SearchBox,
	ServerErrorDiv,
	ServerErrorIcon,
	StockContainer,
	WatchlistButtonDiv,
	WatchlistIcon,
} from "./styles/StockLookup-styles";

import { FormLabel } from "./styles/TradeCalc-styles";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function StockLookup({ options, isAuthenticated, token }) {
	// General
	const [symbol, setSymbol] = useState("");
	const [contentLoading, setContentLoading] = useState(false);

	// Stock state
	const [price, setPrice] = useState("");
	const [status, setStatus] = useState("");
	const [stockInfo, setStockInfo] = useState({});
	const [serverError, setServerError] = useState(false);

	// Chart state
	const [labels, setLabels] = useState([]);
	const [chartData, setChartData] = useState([]);

	// Watchlist state
	const [watchlistSymbols, setWatchlistSymbols] = useState([]);

	const headers = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

    // API keys
    const twelvedata_key = process.env.REACT_APP_TWELVEDATA_KEY
    const marketstack_key = process.env.REACT_APP_MARKETSTACK_KEY


	useEffect(() => {
		document.title = "Stock Lockup";
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			// Grabbing all symbols in the user's watchlist to see if the selected stock is in it or not later
			axios
				.get("http://127.0.0.1:8000/api/watchlist", headers)
				.then((response) => {
					const symbols = [];
					response.data.forEach((element) => {
						symbols.push(element.symbol);
					});
					setWatchlistSymbols(symbols);
				});
		}
	}, [isAuthenticated]);

	// Sets symbol with user input but defaults it to uppercase and restricts it using a regex, only allowing letters, space, hyphen, and period
	const onSymbolChange = (data) => {
		const input = data.toUpperCase();
		const check = /^[A-Z-. ]*$/;

		if (input.match(check)) {
			setSymbol(input);
		}
	};

	// Function for when the user selects a symbol from the list
	const onSymbolSelect = (data) => {
		setStockInfo({});
		setContentLoading(true);
		// Cleaning the option as it includes the symbol, hyphen and a name.
		const letters = data.split("");
		let symbol = [];

		// Getting a list of only the symbol letters
		for (let i = 0; i < letters.length; i++) {
			if (letters[i] !== "-") {
				symbol.push(letters[i]);
			} else {
				break;
			}
		}

		// Setting the symbol state to the joined symbol list
		symbol = symbol.join("");
		setSymbol(symbol);

		const requestOne = axios.get(
			`http://api.marketstack.com/v1/tickers/${symbol}?access_key=${marketstack_key}`
		);
		const requestTwo = axios.get(
			`https://api.twelvedata.com/price?apikey=${twelvedata_key}&symbol=${symbol}`
		);
		const requestThree = axios.get(
			`https://api.twelvedata.com/quote?apikey=${twelvedata_key}&symbol=${symbol}`
		);
		const requestFour = axios.get(
			`http://api.marketstack.com/v1/tickers/${symbol}/eod?access_key=${marketstack_key}&limit=50`
		);

		// Four API requests run simultaneously.
		axios
			.all([requestOne, requestTwo, requestThree, requestFour])
			.then(
				axios.spread((...responses) => {
					const responseOne = responses[0];
					const responseTwo = responses[1];
					const responseThree = responses[2];
					const responseFour = responses[3];

					if (
						responseTwo.data.status === "error" ||
						responseThree.data.status === "error"
					) {
						setServerError(true);
					} else {
						setServerError(false);
					}

					// Information about the stock is gotten from the first request
					setStockInfo(responseOne.data);

					// Current price from the second request
					setPrice(
						Number.parseFloat(responseTwo.data.price).toFixed(2)
					);

					// Difference between the close and open of the stock, determining if the stock is red or green, third request
					setStatus(
						Number.parseFloat(responseThree.data.close) -
							Number.parseFloat(responseThree.data.open) >
							0
							? "green"
							: "red"
					);

					// Chart data from the fourth request
					const labels = [];
					const data = [];

					// Iterating over all the graph data
					responseFour.data.data.eod.forEach((element) => {
						// Goes through the response and pushes the dates to the labels array and the close prices to the data array
						labels.push(
							new Date(element.date).toLocaleDateString()
						);
						data.push(element.close);
					});

					// Sets state with the reverse of the arrays as the information in the request response is in descending order
					setLabels(labels.reverse());
					setChartData(data.reverse());

					// Loading is done
					setContentLoading(false);
				})
			)
			.catch((errors) => {
				// react on errors.
				setServerError(true);
				setContentLoading(false);


			});
	};

	// Function for adding to watchlist
	const handleAdd = () => {
		axios
			.post(
				"http://127.0.0.1:8000/api/add-to-watchlist",
				{
					symbol: symbol,
				},
				headers
			)
			.then((response) => {
				console.log("Added " + response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
			});

		// Gets the list of watchlist symbols, and pushes the current symbol to it. Sets back the state
		let symbols = watchlistSymbols;
		symbols.push(symbol);
		setWatchlistSymbols([...symbols]);
	};

	// Function for removing from watchlist
	const handleRemove = () => {
		axios
			.delete(
				`http://127.0.0.1:8000/api/remove-from-watchlist/${symbol}`,
				headers
			)
			.then((response) => {
				console.log("Remove " + response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
			});

		// Gets the list of watchlist symbols, finds the index of the current symbol, removes it from the list. Sets back the state
		let symbols = watchlistSymbols;
		const index = symbols.indexOf(symbol);
		symbols.splice(index, 1);
		setWatchlistSymbols([...symbols]);
	};

	return (
		<MainContainer>
			<Heading center="true">Stock Lookup</Heading>
			<AutoCompleteSearch
				value={symbol}
				options={options}
				onSelect={onSymbolSelect}
				onChange={onSymbolChange}
				filterOption={(inputValue, option) =>
					option.value
						.toUpperCase()
						.indexOf(inputValue.toUpperCase()) !== -1
				}
			>
				<SearchBox placeholder="Search a stock..." />
			</AutoCompleteSearch>
			<FormLabel validation="true">
				NYSE, NASDAQ, OTC (Must select from drop down)
			</FormLabel>

			<StockContainer>
				{
					// Making sure stockinfo isnt empty and there is no server error
					Object.keys(stockInfo).length !== 0 && !serverError && (
						<>
							<Heading>
								<Price status={status}>{price}</Price>{" "}
								{stockInfo.symbol} - {stockInfo.name}{" "}
							</Heading>
							<Seperator />

							<Details>
								<div>{stockInfo.stock_exchange.country}</div>
								<div>{stockInfo.stock_exchange.name}</div>
							</Details>
							<ChartContainer>
								<Line
									data={{
										labels: labels,
										datasets: [
											{
												label: "Price $",
												data: chartData,
												backgroundColor:
													"rgba(104, 155, 230, 0.2)",
												lineTension: 0,
												borderDash: [1],
												borderDashOffset: 20,
												borderColor:
													"rgba(54, 162, 235, 1)",
												borderWidth: 1.5,
												pointHoverRadius: 5,
												pointRadius: 2,
											},
										],
									}}
									options={{
										legend: {
											display: false,
											labels: {
												fontColor:
													"rgba(54, 162, 235, 1)",
											},
										},
										tooltips: {
											enabled: true,
											titleFontSize: 0,
										},
										scales: {
											yAxes: [
												{
													ticks: {
														beginAtZero: false,
													},
												},
											],
										},
									}}
								/>
							</ChartContainer>

							{/* Rendering watchlist button only if authenticated */}
							{isAuthenticated && (
								<div
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									{watchlistSymbols.includes(symbol) ? (
										<WatchlistButtonDiv
											remove="true"
											onClick={handleRemove}
										>
											<div>
												<WatchlistIcon
													remove="true"
													icon={faEyeSlash}
												/>
											</div>

											<div>Remove from Watchlist</div>
										</WatchlistButtonDiv>
									) : (
										<WatchlistButtonDiv onClick={handleAdd}>
											<div>
												<WatchlistIcon icon={faEye} />
											</div>

											<div>Add to Watchlist</div>
										</WatchlistButtonDiv>
									)}
								</div>
							)}
						</>
					)
				}
			</StockContainer>

			{/* Loading icon when content is loading */}
			{contentLoading && !serverError && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<GridLoader color="var(--second-yellow)" loading />
				</div>
			)}

			{/* Loading server error icon when api is called too many times */}
			{serverError && (
				<ServerErrorDiv>
					<div>
						<ServerErrorIcon />
					</div>
					<div>
						Server called too frequently. <br></br> Try again in a
						minute.
					</div>
				</ServerErrorDiv>
			)}
		</MainContainer>
	);
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	isAuthenticated: state.token !== null,
	token: state.token !== null ? state.token : "",
	authLoading: state.loading,
});

export default connect(mapStateToProps)(StockLookup);
