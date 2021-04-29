import { useState, useRef, useEffect } from "react";
import { useTransition } from "react-spring";
import { faDollarSign, faPercentage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
	Form,
	FormRow,
	FormSection,
	FormLabel,
	IconInputDiv,
	Icon,
	FormInput,
	Result,
} from "./styles/TradeCalc-styles";
import {
	MainContainer,
	Heading,
	Seperator,
	Button,
	InfoDiv,
	AutoCompleteInput,
} from "./styles/Main-styles";

function TradeCalculator({
	symbol,
	setSymbol,
	options,
	risk,
	setRisk,
	capital,
	setCapital,
	totalRisk,
	setTotalRisk,
	price,
	setPrice,
	stopLoss,
	setStopLoss,
	result,
	setResult,
}) {

    
    useEffect(() => {
        document.title = "Trade Calculator";
	}, []);


    

	// Whenever any variable in the dependency array changes, the total risk and result are adjusted
	useEffect(() => {
		// Calculating total risk
		const total_risk = capital * (risk / 100);
		setTotalRisk(total_risk.toFixed(2));

		// Calculating result
		let result = totalRisk / (price - stopLoss);

		// Setting result to the variable value only when its not NaN or Infinity or zero
		if (Number.isNaN(result) || !Number.isFinite(result) || result < 0) {
			setResult(0);
		} else {
			setResult(result.toFixed(2));
		}
	}, [capital, risk, stopLoss, totalRisk, price]);


	// State variables, using Ref for focusing and blurring inputs
	const symbolRef = useRef();
	const riskRef = useRef();

	// Vairable for transition
	const [show, setShow] = useState(false);


	const transitions = useTransition(show, null, {
		from: { opacity: 0, maxHeight: "0px" },
		enter: { opacity: 1, maxHeight: "900px" },
		leave: { opacity: 0, maxHeight: "0px" },
	});


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
		console.log(symbol);
		setSymbol(symbol);


        // API keys
        const twelvedata_key = process.env.REACT_APP_TWELVEDATA_KEY

		// Runs api request to get the last price of symbol
		// Sets price and removes focus from field and focuses on the risk field
		axios
			.get(
				`https://api.twelvedata.com/price?apikey=${twelvedata_key}&symbol=${symbol}`
			)
			.then((response) => {
				const price = parseFloat(response.data.price).toFixed(2);
				setPrice(price);
				symbolRef.current.blur();
				riskRef.current.focus();
			});
	};

	// Sets symbol with user input but defaults it to uppercase and restricts it using a regex, only allowing letters, space, hyphen, and period
	const onSymbolChange = (data) => {
		const input = data.toUpperCase();
		const check = /^[A-Z-. ]*$/;

		if (input.match(check)) {
			setSymbol(input);
		}
	};

	const handleRiskInput = (event) => {
		// Checking input to make sure its less 100 or empty string
		const risk = event.target.value;
		if (parseFloat(risk) <= 100 || risk === "") {
			// Setting the value
			setRisk(risk);
		}
	};

	const handleCapitalInput = (event) => {
		// Setting captial using input
		const capital = event.target.value;
		setCapital(capital);
	};

	const handleStopLossInput = (event) => {
		// Setting stop loss using input
		const number = event.target.value;
		setStopLoss(number);
	};

	// Clears all the variables
	const clear = () => {
		setSymbol("");
		setRisk("");
		setCapital("");
		setTotalRisk("");
		setPrice("");
		setStopLoss("");
		setResult(0);
	};

	// Preventing the letter 'e' in the input fields
	const preventE = (event) => {
		if (event.which === 101 || event.which === 45) {
			event.preventDefault();
		}
	};

	return (
		<MainContainer>
			<Heading>Trade Calculator</Heading>
			<Seperator />
			<div>
				<Button onClick={() => setShow(!show)}>Info</Button>
				<Button onClick={() => clear()} additional="true">
					Clear Values
				</Button>
			</div>

			{transitions.map(
				({ item, key, props }) =>
					item && (
						<InfoDiv key={key} style={props}>
							<div style={{ padding: "20px 20px" }}>
								Utilizing a trade calculator will help you as a
								trader or investor ensure that your trades do
								not exceed your set risk level. The recommended
								maximum risk level for a single trade is 2%.
								Although experienced traders tend to aim for
								even lower levels indicating their conifidence
								in the trade.
							</div>
						</InfoDiv>
					)
			)}
			<Form>
				<FormRow>
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
										.indexOf(inputValue.toUpperCase()) !==
									-1
								}
							>
								<FormInput
									top
									type="text"
									placeholder="AAPL"
									ref={symbolRef}
								/>
							</AutoCompleteInput>
						</IconInputDiv>
						<FormLabel validation="true">
							NYSE, NASDAQ, OTC
						</FormLabel>
					</FormSection>

					<FormSection>
						<FormLabel>Risk %</FormLabel>
						<IconInputDiv>
							<Icon size="2x" icon={faPercentage} />
							<FormInput
								percent
								top
								type="number"
								min="0"
								placeholder="0.00"
								ref={riskRef}
								value={risk}
								onChange={handleRiskInput}
								onKeyPress={preventE}
							/>
						</IconInputDiv>
						<FormLabel validation="true">Less than 100</FormLabel>
					</FormSection>
				</FormRow>

				<FormRow last>
					<FormSection>
						<FormLabel>Total capital</FormLabel>
						<IconInputDiv>
							<Icon grey="true" size="2x" icon={faDollarSign} />
							<FormInput
								type="number"
								placeholder="0.00"
								value={capital}
								onChange={handleCapitalInput}
								onKeyPress={preventE}
							/>
						</IconInputDiv>
					</FormSection>

					<FormSection>
						<FormLabel>Total Risk</FormLabel>
						<IconInputDiv>
							<Icon grey="true" size="2x" icon={faDollarSign} />
							<FormInput
								type="number"
								placeholder="0.00"
								disabled
								value={totalRisk}
							/>
							<FormLabel validation="true">
								Not editable
							</FormLabel>
						</IconInputDiv>
					</FormSection>

					<FormSection>
						<FormLabel>Share price</FormLabel>
						<IconInputDiv>
							<Icon grey="true" size="2x" icon={faDollarSign} />
							<FormInput
								type="number"
								placeholder="0.00"
								disabled
								value={price}
							/>
						</IconInputDiv>
						<FormLabel validation="true">Not editable</FormLabel>
					</FormSection>

					<FormSection last>
						<FormLabel>Stop Loss</FormLabel>
						<IconInputDiv>
							<Icon grey="true" size="2x" icon={faDollarSign} />
							<FormInput
								type="number"
								placeholder="0.00"
								value={stopLoss}
								onChange={handleStopLossInput}
								onKeyPress={preventE}
							/>
						</IconInputDiv>
						<FormLabel validation="true">
							Less than share price
						</FormLabel>
					</FormSection>
				</FormRow>
			</Form>

			<Result title="true">Maximum Shares to be bought:</Result>
			<Result>{result}</Result>
		</MainContainer>
	);
}

export default TradeCalculator;
