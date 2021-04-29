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

import SingleNote from "./SingleNote";
import { Empty, Loading, NotLoggedIn } from "../middlemen/imports";
import { GridLoader } from "react-spinners";

function Notes({ isAuthenticated, token, authLoading }) {
	// State variables
	const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true)

	useEffect(() => {
		document.title = "Notes";
	}, []);

	// Function that runs API call to get all notes
	const getNotes = () => {
        setLoading(true)
		const headers = {
			headers: {
				Authorization: `Token ${token}`,
			},
		};
		axios
			.get("http://127.0.0.1:8000/api/notes", headers)
			.then((response) => {
				setNotes(response.data);
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
			getNotes();
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
				<Heading>Notes</Heading>
				<Seperator />
				<div>
					<Button onClick={() => setShow(!show)}>Info</Button>
					<Button additional="true">
						<Link
							to="/notes/new"
							style={{ color: "var(--main-white)" }}
						>
							New Note
						</Link>
					</Button>
				</div>

				{transitions.map(
					({ item, key, props }) =>
						item && (
							<InfoDiv key={key} style={props}>
								<div style={{ padding: "20px 20px" }}>
									This is where personal notes are kept. Notes
									can include movements to watchout for,
								</div>
							</InfoDiv>
						)
				)}

				<ItemContainer>

                    {/* Loads loading icon if loading is true but if its false and there are no notes, the Empty component is rendered but if there are notes, they will be rendered normally. */}

                    {
                        loading ?

                        <div style={{ display: "flex", justifyContent: "center" }}>
					        <GridLoader color="var(--second-yellow)" loading />
				        </div> 
                        :

                        notes.length === 0 ? 
                        <Empty item="Notes"/> 
                        :
                        notes.map((note) => {
						return (
							<SingleNote
								note={note}
								getNotes={getNotes}
								key={note.id}
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

export default connect(mapStateToProps)(Notes);
