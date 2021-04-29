import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Select } from "antd";
import { useTransition } from "react-spring";
import axios from "axios";
import {
    MainContainer,
	Heading,
	Seperator,
	Button,
	InfoDiv,
    AutoCompleteInput
} from "./styles/Main-styles";

import {
    FormSection,
	FormInput,
	FormLabel,
	IconInputDiv,
	Icon,
} from "./styles/TradeCalc-styles";

import {
    Section,
	Grid,
	Cell,
	CustomSelect,
	Total,
	TradebillForm,
	TradebillFormRow,
	CheckboxGroup,
	Check,
	FormTextArea,
	SubmitButton,
	Required,
} from "./styles/TradebillDetail-styles";
import { Loading, PageNotFound, NotLoggedIn } from "../middlemen/imports";
import { faDollarSign, faHashtag } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

function TradebillDetail({ isAuthenticated, token, authLoading, options }) {
	let history = useHistory();

	// Getting the id passed into the url
	const { tradebill_id } = useParams();
	const [found, setFound] = useState(false);
	const [contentLoading, setContentLoading] = useState(true);

	// Headers for api requests
	const headers = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

    // API keys
    const twelvedata_key = process.env.REACT_APP_TWELVEDATA_KEY

	useEffect(() => {
		// Changing the document title
		document.title = "Tradebill Detail";

		if (isAuthenticated) {
			// Making sure the user isnt making a new tradebill and is requesting one
			if (tradebill_id !== "new") {
				axios
					.get(
						`http://127.0.0.1:8000/api/tradebills/${tradebill_id}`,
						headers
					)
					.then((response) => {
						// Settings all the state variables to all the values from the response
						const data = response.data;
						setFound(true);
						setContentLoading(false);
						setWeeklyImp(data.weekly_imp);
						setDailyPrice(data.daily_price);
						setRsi(data.rsi);
						setFalseBreakout(data.false_breakout);
						setPerfection(data.perfection);

						setBounce(data.bounce);
						setAbove_50ma(data.above_50ma);
						setSymbol(data.symbol);
						setRisk(data.risk);
						setSize(data.size);
						setStopLoss(data.stop);
						setPrice(data.entry);
						setTarget(data.target);
						setSummary(data.summary);

						setDaily_channel(data.daily_channel_height);
						setA_target(data.A_target);
						setSoft_stopLoss(data.soft_stop);
						setBreakeven(data.breakeven);
						setFilled(data.filled);
						setStop_entered(data.stop_entered);
						setProfit_taking(data.profit_taking_entered);
					})
					.catch((error) => {
						// Setting found to false if the tradebill doesnt exist
						setFound(false);
						setContentLoading(false);
					});
			} else if (tradebill_id === "new") {
				// If the parameter is
				setFound(true);
				setContentLoading(false);
			}
		}
	}, [isAuthenticated]);

	//---------------
	// Transitions
	//--------------

	// Vairables for first transition
	const [showFirst, setShowFirst] = useState(false);
	const first_transitions = useTransition(showFirst, null, {
		from: { opacity: 0, maxHeight: "0px" },
		enter: { opacity: 1, maxHeight: "900px" },
		leave: { opacity: 0, maxHeight: "0px" },
	});

	// Vairables for second transition
	const [showSecond, setShowSecond] = useState(false);
	const second_transitions = useTransition(showSecond, null, {
		from: { opacity: 0, maxHeight: "0px" },
		enter: { opacity: 1, maxHeight: "900px" },
		leave: { opacity: 0, maxHeight: "0px" },
	});

	// Vairables for third transition
	const [showThird, setShowThird] = useState(false);
	const third_transitions = useTransition(showThird, null, {
		from: { opacity: 0, maxHeight: "0px" },
		enter: { opacity: 1, maxHeight: "900px" },
		leave: { opacity: 0, maxHeight: "0px" },
	});

	//---------------
	// First section
	//--------------
	const [weeklyImp, setWeeklyImp] = useState(0);
	const [dailyPrice, setDailyPrice] = useState(0);
	const [rsi, setRsi] = useState(0);
	const [falseBreakout, setFalseBreakout] = useState(0);
	const [perfection, setPerfection] = useState(0);
	const [score, setScore] = useState(
		weeklyImp + dailyPrice + rsi + falseBreakout + perfection
	);
	const [status, setStatus] = useState("red");

	// Sets score according to the the variables inputted
	useEffect(() => {
		setScore(weeklyImp + dailyPrice + rsi + falseBreakout + perfection);
	}, [weeklyImp, dailyPrice, rsi, falseBreakout, perfection]);

	// Sets the status according the score
	useEffect(() => {
		if (score < 7) {
			setStatus("red");
		} else {
			setStatus("green");
		}
	}, [score]);

	// Functions for setting input values
	const handleWeeklyImpChange = (value) => {
		setWeeklyImp(parseInt(value));
	};

	const handleDailyPriceChange = (value) => {
		setDailyPrice(parseInt(value));
	};

	const handleRsiChange = (value) => {
		setRsi(parseInt(value));
	};

	const handleFalseBreakoutChange = (value) => {
		setFalseBreakout(parseInt(value));
	};

	const handlePerfectionChange = (value) => {
		setPerfection(parseInt(value));
	};

	//---------------
	// Second section
	//--------------

	// Second section state variables
	const [bounce, setBounce] = useState(false);
	const [above_50ma, setAbove_50ma] = useState(false);
	const [symbol, setSymbol] = useState("");
	const [risk, setRisk] = useState("");
	const [size, setSize] = useState("");
	const [price, setPrice] = useState("");
	const [stopLoss, setStopLoss] = useState("");
	const [target, setTarget] = useState("");
	const [target_error, setTarget_error] = useState(false);
	const [summary, setSummary] = useState("");

	// Sets stop loss everytime the risk, price or size is changed.
	useEffect(() => {
		// Calculates stop loss from size, price and risk to ensure the user only risks what he inputed in the risk field when he buys the number shares in the size field
		const stoploss = (size * price - risk) / size;
		if (stoploss < 0) {
			setStopLoss("");
		} else {
			setStopLoss(stoploss.toFixed(2));
		}
	}, [risk, price, size]);

	// Toggles error when target is lower than price
	useEffect(() => {
		if (parseInt(target) < parseInt(price) || target === "") {
			setTarget_error(true);
		} else {
			setTarget_error(false);
		}
	}, [target, price]);

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

		// Runs api request to get the last price of symbol
		// Sets price and removes focus from field and focuses on the risk field
		axios
			.get(
				`https://api.twelvedata.com/price?apikey=${twelvedata_key}&symbol=${symbol}`
			)
			.then((response) => {
				const price = parseFloat(response.data.price).toFixed(2);
				setPrice(price);
			});
	};

	// Preventing the letter 'e' in the input fields
	const preventE = (event) => {
		if (event.which === 101 || event.which === 45) {
			event.preventDefault();
		}
	};

	// Setting risk using input
	const handleRiskInput = (event) => {
		const risk = event.target.value;
		setRisk(risk);
	};

	// Setting size using input
	const handleSizeInput = (event) => {
		const size = event.target.value;
		setSize(size);
	};

	// Setting target using input
	const handleTargetInput = (event) => {
		const target = event.target.value;
		setTarget(target);
	};

	// Setting summary using input
	const handleSummaryInput = (event) => {
		const target = event.target.value;
		setSummary(target);
	};

	// Setting checkboxes
	const onBounceCheck = (event) => {
		setBounce(event.target.checked);
	};

	const onAbove_50MACheck = (event) => {
		setAbove_50ma(event.target.checked);
	};

	//---------------
	// Third section
	//--------------
	const [daily_channel, setDaily_channel] = useState("");
	const [a_target, setA_target] = useState("");
	const [soft_stopLoss, setSoft_stopLoss] = useState("");
	const [breakeven, setBreakeven] = useState("");

	const [filled, setFilled] = useState(false);
	const [stop_entered, setStop_entered] = useState(false);
	const [profit_taking, setProfit_taking] = useState(false);

	useEffect(() => {
		setA_target(
			(parseInt(price) + 0.3 * parseInt(daily_channel)).toFixed(2)
		);
	}, [daily_channel, price, a_target]);

	// Setting Daily channel height using input
	const handledailyChannelInput = (event) => {
		const target = event.target.value;
		setDaily_channel(target);
	};

	const handleSoftStopLossInput = (event) => {
		setSoft_stopLoss(event.target.value);
	};

	const handleBreakevenInput = (event) => {
		setBreakeven(event.target.value);
	};

	// Setting checkboxes
	const onFilledCheck = (event) => {
		setFilled(event.target.checked);
	};

	const onStop_enteredCheck = (event) => {
		setStop_entered(event.target.checked);
	};

	const onProfit_takingCheck = (event) => {
		setProfit_taking(event.target.checked);
	};

	//---------
	// Working with tradbeill saving
	//---------

	const [required, setRequired] = useState(false);

	const handleFormSubmit = (event) => {
		// Preventing page refresh
		event.preventDefault();

		// Only saving the tradebill or saving changes when all the required fields are not empty
		if (
			symbol !== "" &&
			risk !== "" &&
			size !== "" &&
			target !== "" &&
			daily_channel !== "" &&
			soft_stopLoss !== "" &&
			breakeven !== ""
		) {
			setRequired(false);
			console.log("Form fucking submitted");

			const data = {
				symbol: symbol,
				weekly_imp: weeklyImp,
				daily_price: dailyPrice,
				rsi: rsi,
				false_breakout: falseBreakout,
				perfection: perfection,
				bounce: bounce,
				above_50ma: above_50ma,
				summary: summary,
				risk: risk,
				size: size,
				entry: price,
				stop: stopLoss,
				target: target,
				daily_channel_height: daily_channel,
				A_target: a_target,
				soft_stop: soft_stopLoss,
				breakeven: breakeven,
				filled: filled,
				stop_entered: stop_entered,
				profit_taking_entered: profit_taking,
			};

			// Checking if the user is making a new tradebill or just editing
			if (tradebill_id === "new") {
				axios
					.post(
						"http://127.0.0.1:8000/api/tradebill-create",
						data,
						headers
					)
					.then((response) => {
						history.push("/tradebills");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			} else {
				axios
					.patch(
						`http://127.0.0.1:8000/api/tradebill-edit/${tradebill_id}`,
						data,
						headers
					)
					.then((response) => {
						history.push("/tradebills");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			}
		} else {
			setRequired(true);
		}
	};

	const handleCancel = (event) => {
		// Preventing page refresh
		event.preventDefault();

		history.push("/tradebills");
	};

	// Will render loading screen if authentication or content is loading still
	if (authLoading || contentLoading) {
		return <Loading />;
	} else if (!isAuthenticated) {
		// Render this if the user isnt logged in yet
		return <NotLoggedIn />;

		// If found is false, it renders the page not found component
	} else if (!found) {
		return <PageNotFound />;

		// else render the tradebill
	} else {
		return (
			<MainContainer>
				<Heading>
					{tradebill_id === "new"
						? "New Tradebill"
						: "Tradebill Details"}
				</Heading>
				<Seperator />

				<div>
					<Button onClick={() => setShowFirst(!showFirst)}>
						First Section
					</Button>
				</div>

				{first_transitions.map(
					({ item, key, props }) =>
						item && (
							<InfoDiv key={key} style={props}>
								<div style={{ padding: "20px 20px" }}>
									With the help of these six properties, you
									can know right away whether going through
									with this trade is sensible or a gamble.
									Start off by giving each property a score
									from 0 to 2 (0 being the worst, 2 being the
									best) and lastly observe the total score. If
									the score is{" "}
									<span
										style={{
											color: "rgba(255, 105, 97, 1)",
										}}
									>
										red
									</span>{" "}
									(below 7), look for another trade. If{" "}
									<span style={{ color: "#78CF78" }}>
										green
									</span>
									, continue creating the tradebill.
								</div>
							</InfoDiv>
						)
				)}

				<Section>
					<Grid>
						{/* FIRST ROW */}
						<Cell cell="cell-1"></Cell>
						<Cell header="header1">zero</Cell>
						<Cell header="header2">one</Cell>
						<Cell header="header3">two</Cell>
						<Cell header="header4">score</Cell>

						{/* SECOND ROW */}

						<Cell sideheader="sideHeader1">Weekly Impulse</Cell>
						<Cell cell="cell-2">red</Cell>
						<Cell cell="cell-3">green</Cell>
						<Cell cell="cell-4">blue (after red)</Cell>
						<Cell cell="cell-5">
							<CustomSelect
								defaultValue={weeklyImp}
								value={weeklyImp}
								dropdownMatchSelectWidth={180}
								dropdownStyle={{ textAlign: "center" }}
								onChange={handleWeeklyImpChange}
							>
								<Option value="0">0 - red</Option>
								<Option value="1">1 - green</Option>
								<Option value="2">2 - blue (after red)</Option>
							</CustomSelect>
						</Cell>

						{/* THIRD ROW */}
						<Cell sideheader="sideHeader2">Daily Price</Cell>

						<Cell cell="cell-6">above value</Cell>
						<Cell cell="cell-7">in value zone</Cell>
						<Cell cell="cell-8">below value</Cell>

						<Cell cell="cell-9">
							<CustomSelect
								defaultValue={dailyPrice}
								value={dailyPrice}
								dropdownMatchSelectWidth={180}
								dropdownStyle={{ textAlign: "center" }}
								onChange={handleDailyPriceChange}
							>
								<Option value="0">0 - above value</Option>
								<Option value="1">1 - in value zone</Option>
								<Option value="2">2 - below value</Option>
							</CustomSelect>
						</Cell>

						{/* FOURTH ROW */}
						<Cell sideheader="sideHeader3">RSI</Cell>

						<Cell cell="cell-10">overbought</Cell>
						<Cell cell="cell-11">oversold</Cell>
						<Cell cell="cell-12">
							oversold with bullish divergence
						</Cell>

						<Cell cell="cell-13">
							<CustomSelect
								defaultValue={rsi}
								value={rsi}
								dropdownMatchSelectWidth={250}
								dropdownStyle={{ textAlign: "center" }}
								onChange={handleRsiChange}
							>
								<Option value="0">0 - overbought</Option>
								<Option value="1">1 - oversold</Option>
								<Option value="2">
									2 - oversold & bullish divergence
								</Option>
							</CustomSelect>
						</Cell>

						{/* FIFTH ROW */}
						<Cell sideheader="sideHeader4">False Breakout</Cell>

						<Cell cell="cell-14">none</Cell>
						<Cell cell="cell-15">in place</Cell>
						<Cell cell="cell-16">near</Cell>

						<Cell cell="cell-17">
							<CustomSelect
								defaultValue={falseBreakout}
								value={falseBreakout}
								dropdownMatchSelectWidth={130}
								dropdownStyle={{ textAlign: "center" }}
								onChange={handleFalseBreakoutChange}
							>
								<Option value="0">0 - none</Option>
								<Option value="1">1 - in place</Option>
								<Option value="2">2 - near</Option>
							</CustomSelect>
						</Cell>

						{/* SIXTH ROW */}
						<Cell sideheader="sideHeader5">Perfection</Cell>

						<Cell cell="cell-18" lastRow>
							neither time
						</Cell>
						<Cell cell="cell-19" lastRow>
							one timeframe
						</Cell>
						<Cell cell="cell-20" lastRow>
							both timeframes
						</Cell>

						<Cell cell="cell-21" lastRow>
							<CustomSelect
								defaultValue={perfection}
								value={perfection}
								dropdownMatchSelectWidth={200}
								dropdownStyle={{ textAlign: "center" }}
								onChange={handlePerfectionChange}
							>
								<Option value="0">0 - neither time</Option>
								<Option value="1">1 - one timeframe</Option>
								<Option value="2">2 - both timeframes</Option>
							</CustomSelect>
						</Cell>

						{/* SEVENTH ROW */}
						<Cell cell="cell-26" total>
							<Total status={status}>{score}</Total>
						</Cell>
					</Grid>
				</Section>
				<Section>
					<div>
						<Button onClick={() => setShowSecond(!showSecond)}>
							Second Section
						</Button>
					</div>

					{second_transitions.map(
						({ item, key, props }) =>
							item && (
								<InfoDiv key={key} style={props}>
									<div style={{ padding: "20px 20px" }}>
										The top row involves check boxes that
										ask questions about the general state of
										the stock. <br></br>
										<strong>Bounce signal</strong> refers to
										the pricing bouncing on a support level,
										indicating bulls taking control.{" "}
										<br></br>
										<strong>Above 50MA</strong> refers to
										the price being above its 50 day moving
										average.<br></br>
										<br></br> Then comes more information
										about the trade itself. <br></br>{" "}
										<strong>Risk $</strong> being how many
										dollars you are willing to risk for this
										trade (2% of your total capital being
										the optimum amount). <br></br>
										<strong>Stop Loss</strong> is calculated
										for you depending on how high the Risk $
										is. <br></br>
										<strong>Entry price</strong> being the
										price that you have entered the trade in
										or the current price of the stock if
										youve just selected it. <br></br>
										<strong>Target</strong> being the price
										that you have predicted to hit.
									</div>
								</InfoDiv>
							)
					)}

					<TradebillForm>
						<CheckboxGroup>
							<Check onChange={onBounceCheck} checked={bounce}>
								Bounce signal
							</Check>
							<Check
								onChange={onAbove_50MACheck}
								checked={above_50ma}
							>
								Above 50MA
							</Check>
						</CheckboxGroup>

						<TradebillFormRow center>
							<FormSection>
								<FormLabel>Stock Symbol</FormLabel>
								<IconInputDiv>
									<Icon size="2x" icon={faDollarSign} />
									<AutoCompleteInput
										value={symbol}
										options={options}
										onSelect={onSymbolSelect}
										onChange={onSymbolChange}
										filterOption={(inputValue, option) =>
											option.value
												.toUpperCase()
												.indexOf(
													inputValue.toUpperCase()
												) !== -1
										}
									>
										<FormInput
											top
											type="text"
											placeholder="AAPL"
										/>
									</AutoCompleteInput>
								</IconInputDiv>
								<FormLabel validation="true">
									NYSE, NASDAQ, OTC
								</FormLabel>
							</FormSection>

							<FormSection>
								<FormLabel>Risk $</FormLabel>
								<IconInputDiv>
									<Icon size="2x" icon={faDollarSign} />
									<FormInput
										top
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={risk}
										onChange={handleRiskInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>
								{!risk && (
									<FormLabel validation="true">
										Required
									</FormLabel>
								)}
							</FormSection>
							<FormSection>
								<FormLabel>Size</FormLabel>
								<IconInputDiv>
									<Icon size="2x" icon={faHashtag} />
									<FormInput
										percent
										top
										type="number"
										min="0"
										placeholder="0"
										step="any"
										value={size}
										onChange={handleSizeInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>
								{!size && (
									<FormLabel validation="true">
										Required
									</FormLabel>
								)}
							</FormSection>
						</TradebillFormRow>
						<TradebillFormRow center>
							<FormSection>
								<FormLabel>Stop Loss</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={stopLoss}
										disabled
									/>
								</IconInputDiv>
								<FormLabel validation="true">
									Not editable
								</FormLabel>
							</FormSection>

							<FormSection>
								<FormLabel>Entry Price</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={price}
										disabled
									/>
								</IconInputDiv>
								<FormLabel validation="true">
									Not editable
								</FormLabel>
							</FormSection>

							<FormSection>
								<FormLabel>Target</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={target}
										onChange={handleTargetInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>
								{target_error && (
									<FormLabel validation="true">
										Target should be higher than price
									</FormLabel>
								)}
							</FormSection>
						</TradebillFormRow>
						<TradebillFormRow>
							<FormSection>
								<FormLabel>Summary</FormLabel>
								<FormTextArea
									placeholder="What do you think about this trade"
									value={summary}
									onInput={handleSummaryInput}
								></FormTextArea>
							</FormSection>
						</TradebillFormRow>
					</TradebillForm>
				</Section>
				<Section>
					<div>
						<Button onClick={() => setShowThird(!showThird)}>
							Third Section
						</Button>
					</div>

					{third_transitions.map(
						({ item, key, props }) =>
							item && (
								<InfoDiv key={key} style={props}>
									<div style={{ padding: "20px 20px" }}>
										<strong>A target</strong> refers to 30%
										of the daily channel height added to the
										price. (Channel lines are contruscted by
										drawing price lines 3%-5% above and
										below the EMA.) <br></br>
										<strong>Soft stop loss</strong> is the
										stop that you keep in mind. While the{" "}
										<strong>hard stop</strong> is the actual
										stop loss you placed. The same stop loss
										as section 2<br></br>{" "}
										<strong>Breakeven</strong> is the price
										you will have to move the stop loss to
										to break even.
									</div>
								</InfoDiv>
							)
					)}

					<TradebillForm>
						<TradebillFormRow center>
							<FormSection>
								<FormLabel>Daily Channel Height</FormLabel>
								<IconInputDiv>
									<Icon size="2x" icon={faDollarSign} />
									<FormInput
										top
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={daily_channel}
										onChange={handledailyChannelInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>
								{!daily_channel && (
									<FormLabel validation="true">
										Required
									</FormLabel>
								)}
							</FormSection>
							<FormSection>
								<FormLabel>A-Target</FormLabel>
								<IconInputDiv>
									<Icon size="2x" icon={faDollarSign} />
									<FormInput
										top
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={a_target}
										onKeyPress={preventE}
										readOnly
									/>
								</IconInputDiv>
								<FormLabel validation="true">
									Not editable
								</FormLabel>
							</FormSection>
						</TradebillFormRow>
						<TradebillFormRow center>
							<FormSection>
								<FormLabel>Soft Stop Loss</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={soft_stopLoss}
										onChange={handleSoftStopLossInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>
								{!soft_stopLoss && (
									<FormLabel validation="true">
										Required
									</FormLabel>
								)}
							</FormSection>

							<FormSection>
								<FormLabel>Hard Stop Loss</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={stopLoss}
										disabled
									/>
								</IconInputDiv>
								<FormLabel validation="true">
									Not editable
								</FormLabel>
							</FormSection>
							<FormSection>
								<FormLabel>Breakeven</FormLabel>
								<IconInputDiv>
									<Icon
										size="2x"
										grey="true"
										icon={faDollarSign}
									/>
									<FormInput
										type="number"
										min="0"
										placeholder="0.00"
										step="any"
										value={breakeven}
										onChange={handleBreakevenInput}
										onKeyPress={preventE}
									/>
								</IconInputDiv>

								{!breakeven && (
									<FormLabel validation="true">
										Required
									</FormLabel>
								)}
							</FormSection>
						</TradebillFormRow>
						<TradebillFormRow center>
							<CheckboxGroup>
								<Check
									onChange={onFilledCheck}
									checked={filled}
								>
									Filled
								</Check>
								<Check
									onChange={onStop_enteredCheck}
									checked={stop_entered}
								>
									Stop Entered
								</Check>
								<Check
									onChange={onProfit_takingCheck}
									checked={profit_taking}
								>
									Profit taking entered
								</Check>
							</CheckboxGroup>
						</TradebillFormRow>

						<TradebillFormRow center>
							<FormSection cancel="true">
								<SubmitButton
									onClick={handleCancel}
									cancel="true"
								>
									Cancel
								</SubmitButton>
							</FormSection>

							<FormSection>
								<SubmitButton onClick={handleFormSubmit}>
									{tradebill_id === "new"
										? "Save Tradebill"
										: "Save Changes"}
								</SubmitButton>

								{required && (
									<Required>
										Fill in all the required fields
									</Required>
								)}
							</FormSection>
						</TradebillFormRow>
					</TradebillForm>
				</Section>
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

export default connect(mapStateToProps)(TradebillDetail);
