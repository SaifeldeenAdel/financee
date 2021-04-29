import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTransition } from "react-spring";
import axios from "axios";

import {
	MainContainer,
	ItemContainer,
	Heading,
	Seperator,
	Button,
	InfoDiv,
} from "./styles/Main-styles";

import SingleTradebill from "./SingleTradebill";
import { Empty, Loading, NotLoggedIn } from "../middlemen/imports";
import { GridLoader } from "react-spinners";

function Tradebills({ isAuthenticated, token, authLoading }) {
	// State variables
	const [tradebills, setTradebills] = useState([]);
    const [loading, setLoading] = useState(true)

	useEffect(() => {
		document.title = "Tradebills";
	}, []);

	const getTradebills = () => {
        // Setting loading to true
        setLoading(true)
		const headers = {
			headers: {
				Authorization: `Token ${token}`,
			},
		};
		axios
			.get("http://127.0.0.1:8000/api/tradebills", headers)
			.then((response) => {
                // Setting tradebills and setting loading to false
				setTradebills(response.data);
                setLoading(false)
			})
			.catch((error) => {
				console.log(error.response.date);
			});
	};

	// Runs when the components mounts and whenever the isAuthenticated variable changes.
	useEffect(() => {
		// If the user is authenticated, an api request is run to get and set the user's tradebills.
		if (isAuthenticated) {
			getTradebills();
		}
	}, [isAuthenticated]);

	// Vairable for transition
	const [show, setShow] = useState(false);

	const transitions = useTransition(show, null, {
		from: { opacity: 0, maxHeight: "0px" },
		enter: { opacity: 1, maxHeight: "900px" },
		leave: { opacity: 0, maxHeight: "0px" },
	});

	// Will render loading screen if authentication is loading still
	if (authLoading) {
		return <Loading />;
	} else if (!isAuthenticated) {
		// Render this if the user isnt logged in yet
		return <NotLoggedIn />;
	} else {
		return (
			<MainContainer>
				<Heading>Tradebills</Heading>
				<Seperator />
				<div>
					<Button onClick={() => setShow(!show)}>Info</Button>
					<Button additional="true">
						<Link
							to="/tradebills/new"
							style={{ color: "var(--main-white)" }}
						>
							New Tradebill
						</Link>
					</Button>
				</div>

				{transitions.map(
					({ item, key, props }) =>
						item && (
							<InfoDiv key={key} style={props}>
								<div style={{ padding: "20px 20px" }}>
									A tradebill helps you focus on the key
									aspects of a trade. Instead of taking
									spontaneous buying decisions, by simply
									filling out a tradebill, you will reach a
									conclusion and thus will be able to make a
									confident decision on whether or not this is
									a liable trade or not.
								</div>
							</InfoDiv>
						)
				)}

				<ItemContainer>
                    {/* Loads loading icon if loading is true but if its false and there are no tradebills, the Empty component is rendered but if there are tradebills, they will be rendered normally. */}

                    {

                        loading ?

                        <div style={{ display: "flex", justifyContent: "center" }}>
					        <GridLoader color="var(--second-yellow)" loading />
				        </div> 
                        :

                        tradebills.length === 0 ? 
                        <Empty item="Tradebills"/> :

                        tradebills.map((tradebill) => {
						return (
							<SingleTradebill
								tradebill={tradebill}
								getTradebills={getTradebills}
								key={tradebill.id}
							/>
                            );
                        })
                        
                    }
					{}
				</ItemContainer>
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

export default connect(mapStateToProps)(Tradebills);
