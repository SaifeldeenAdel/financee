import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTransition } from "react-spring";
import { Link } from "react-router-dom";
import axios from "axios";

import {
	MainContainer,
    ItemContainer,
	Heading,
	Seperator,
	Button,
	InfoDiv,
} from "./styles/Main-styles";
import { Empty, Loading, NotLoggedIn } from "../middlemen/imports";
import SingleWatchlist from "./SingleWatchlist";
import { GridLoader } from "react-spinners";

function Watchlist({ isAuthenticated, token, authLoading }) {
    // State variables
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true)


	useEffect(() => {
		document.title = "Watchlist";
	}, []);

	// Function that runs API call to get all notes
	const getWatchlist = () => {
        setLoading(true)

		const headers = {
			headers: {
				Authorization: `Token ${token}`,
			},
		};
		axios
			.get("http://127.0.0.1:8000/api/watchlist", headers)
			.then((response) => {
				setWatchlist(response.data);
                setLoading(false)

			})
			.catch((error) => {
				console.log(error.response.date);
			});
	};

	// Runs when the components mounts and whenever the isAuthenticated variable changes.
	useEffect(() => {
		// If the user is authenticated, an api request is run to get and set the user's watchlist.
		if (isAuthenticated) {
			getWatchlist();
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
				<Heading>Watchlist</Heading>
				<Seperator />

				<div>
					<Button onClick={() => setShow(!show)}>Info</Button>
					<Button additional="true">
						<Link
							to="/stock-lookup"
							style={{ color: "var(--main-white)" }}
						>
							Stock Lookup
						</Link>
					</Button>
				</div>

				{transitions.map(
					({ item, key, props }) =>
						item && (
							<InfoDiv key={key} style={props}>
								<div style={{ padding: "20px 20px" }}>
									This is where you can keep an eye on
									specific stocks instead of having to look
									them up everytime.
									<br /> Expreienced traders use watchlists to
									keep possible trade opporutnities ready
									instead of impulsively placing a trade.
								</div>
							</InfoDiv>
						)
				)}

				<ItemContainer>
                    {/* Loads loading icon if loading is true but if its false and there are no watchlist items, the Empty component is rendered but if there are watchlist items, they will be rendered normally. */}

                    {
                        loading ?

                        <div style={{ display: "flex", justifyContent: "center" }}>
					        <GridLoader color="var(--second-yellow)" loading />
				        </div> 
                        :

                        watchlist.length === 0 ? 
                        <Empty item="Watchlist Items"/>  :
                        
                        watchlist.map((watchlist_item) => {
						return (
							<SingleWatchlist
								watchlist_item={watchlist_item}
								getWatchlist={getWatchlist}
								key={watchlist_item.id}
							/>
						);
					    })

                    }
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

export default connect(mapStateToProps)(Watchlist);
