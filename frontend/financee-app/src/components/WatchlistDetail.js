import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import {
	MainContainer,
	Heading,
	Seperator,
	Button,
} from "./styles/Main-styles";
import { Loading, PageNotFound, NotLoggedIn } from "../middlemen/imports";
import {
	ChartContainer,
	Details,
	Price,
	ServerErrorDiv,
	ServerErrorIcon,
	WatchlistButtonDiv,
	WatchlistIcon,
} from "./styles/StockLookup-styles";
import { WatchlistStockContainer } from "./styles/WatchlistDetail-styles";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function WatchlistDetail({ isAuthenticated, token, authLoading }) {
	let history = useHistory();
	const { watchlist_id } = useParams();

	const [found, setFound] = useState(false);
	const [contentLoading, setContentLoading] = useState(true);
	const [removed, setRemoved] = useState(false);
	const [symbol, setSymbol] = useState("");

	// Stock state
	const [price, setPrice] = useState("");
	const [status, setStatus] = useState("");
	const [stockInfo, setStockInfo] = useState({});
	const [serverError, setServerError] = useState(false);

	// Chart state
	const [labels, setLabels] = useState([]);
	const [chartData, setChartData] = useState([]);

	// Headers for api requests
	const headers = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

    // API keys
    const twelvedata_key = process.env.REACT_APP_TWELVEDATA_KEY
    const marketstack_key = process.env.REACT_APP_MARKETSTACK_KEY


	useEffect(() => {
		document.title = "Watchlist Detail";

		if (isAuthenticated) {
			axios
				.get(
					`http://127.0.0.1:8000/api/watchlist/${watchlist_id}`,
					headers
				)
				.then((response) => {
					const symbol = response.data.symbol;
					setFound(true);
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
						.all([
							requestOne,
							requestTwo,
							requestThree,
							requestFour,
						])
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
									Number.parseFloat(
										responseTwo.data.price
									).toFixed(2)
								);

								// Difference between the close and open of the stock, determining if the stock is red or green, third request
								setStatus(
									Number.parseFloat(
										responseThree.data.close
									) -
										Number.parseFloat(
											responseThree.data.open
										) >
										0
										? "green"
										: "red"
								);

								// Chart data from the fourth request
								const labels = [];
								const data = [];

								// Iterating over all the graph data
								responseFour.data.data.eod.forEach(
									(element) => {
										// Goes through the response and pushes the dates to the labels array and the close prices to the data array
										labels.push(
											new Date(
												element.date
											).toLocaleDateString()
										);
										data.push(element.close);
									}
								);

								// Sets state with the reverse of the arrays as the information in the request response is in descending order
								setLabels(labels.reverse());
								setChartData(data.reverse());

								// Loading is done
								setContentLoading(false);
							})
						)
						.catch((errors) => {
							// react on errors.
						});
				})
				.catch((error) => {
					setFound(false);
					setContentLoading(false);
				});
		} else {
			setContentLoading(false);
		}
	}, [isAuthenticated]);

	// Function for going back to watchlist when theres server error
	const handleGoBack = () => {
		history.push("/watchlist");
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
				setRemoved(false);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
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
				setRemoved(true);
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	if (authLoading || contentLoading) {
		return <Loading />;
	} else if (!isAuthenticated) {
		return <NotLoggedIn />;
	} else if (!found) {
		return <PageNotFound />;
	} else {
		return (
			<MainContainer>
				<WatchlistStockContainer>
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
									<div>
										{stockInfo.stock_exchange.country}
									</div>
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
										{removed ? (
											<WatchlistButtonDiv
												onClick={handleAdd}
											>
												<div>
													<WatchlistIcon
														icon={faEye}
													/>
												</div>

												<div>Add to Watchlist</div>
											</WatchlistButtonDiv>
										) : (
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
										)}
									</div>
								)}
							</>
						)
					}
				</WatchlistStockContainer>

				{/* Loading server error icon when api is called too many times */}
				{serverError && (
					<ServerErrorDiv>
						<div>
							<ServerErrorIcon />
						</div>
						<div>
							Server called too frequently. <br></br> Try again in
							a minute.
						</div>
						<Button onClick={handleGoBack}>
							Back to Watchlist
						</Button>
					</ServerErrorDiv>
				)}
			</MainContainer>
		);
	}
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	isAuthenticated: state.token !== null,
	token: state.token !== null ? state.token : "",
	authLoading: state.loading,
});

export default connect(mapStateToProps)(WatchlistDetail);
