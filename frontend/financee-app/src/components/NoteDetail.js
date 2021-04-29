import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { MainContainer } from "./styles/Main-styles";
import { FormLabel } from "./styles/TradeCalc-styles";
import {
	NoteLabel,
	NoteContent,
	NoteTitle,
	NoteSubmitButton,
	Required,
} from "./styles/NoteDetail-styles";

import { Loading, PageNotFound, NotLoggedIn } from "../middlemen/imports";

function NoteDetail({ isAuthenticated, token, authLoading }) {
	let history = useHistory();

	// Getting the id passed into the url
	const { note_id } = useParams();
	const [found, setFound] = useState(false);
	const [contentLoading, setContentLoading] = useState(true);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [required, setRequired] = useState(false);

	// Headers for api requests
	const headers = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

	useEffect(() => {
		console.log(found);
	}, [found]);

	useEffect(() => {
		document.title = "Note Detail";

		if (isAuthenticated) {
			// Making sure the user isnt making a new note and is requesting one
			if (note_id !== "new") {
				axios
					.get(`http://127.0.0.1:8000/api/notes/${note_id}`, headers)
					.then((response) => {
						// Settings all the state variables to all the values from the response
						const data = response.data;
						setFound(true);
						setContentLoading(false);
						setTitle(data.title);
						setContent(data.content);
					})
					.catch((error) => {
						// Setting found to false if the tradebill doesnt exist
						setFound(false);
						setContentLoading(false);
					});
			}
		}
	}, [isAuthenticated]);

	// Functions for handling input, cancel and submit
	const handleTitleInput = (event) => {
		setTitle(event.target.value);
	};

	const handleContentInput = (event) => {
		setContent(event.target.value);
	};

	const handleCancel = () => {
		history.push("/notes");
	};

	const handleSubmit = () => {
		// checks if user inputted or not
		if (title === "" || content === "") {
			setRequired(true);
		} else {
			const data = {
				title: title,
				content: content,
			};

			// Checking if the user is editing or is saving a new note, different requests accordingly
			if (note_id === "new") {
				axios
					.post(
						"http://127.0.0.1:8000/api/note-create",
						data,
						headers
					)
					.then((response) => {
						history.push("/notes");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			} else {
				axios
					.patch(
						`http://127.0.0.1:8000/api/note-edit/${note_id}`,
						data,
						headers
					)
					.then((response) => {
						history.push("/notes");
					})
					.catch((error) => {
						console.log(error.response.data);
					});
			}
			setRequired(false);
		}
	};

	// Will render loading screen if authentication is loading still
	if (authLoading) {
		return <Loading />;
	} else if (!isAuthenticated) {
		// Render this if the user isnt logged in yet
		return <NotLoggedIn />;
	} else if (note_id === "new" || found) {
		return (
			<MainContainer>
				<NoteLabel>Title</NoteLabel>
				<NoteTitle
					placeholder=""
					value={title}
					onChange={handleTitleInput}
				/>
				<FormLabel validation>Required</FormLabel>
				<NoteLabel>Content</NoteLabel>
				<NoteContent
					placeholder=""
					value={content}
					onChange={handleContentInput}
				/>
				<FormLabel validation>Required</FormLabel>

				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<div>
						<NoteSubmitButton cancel="true" onClick={handleCancel}>
							Cancel
						</NoteSubmitButton>
					</div>
					<div>
						<NoteSubmitButton onClick={handleSubmit}>
							{note_id === "new" ? "Save Note" : "Save Changes"}
						</NoteSubmitButton>
						{required && (
							<Required>Fill in all the required fields</Required>
						)}
					</div>
				</div>
			</MainContainer>
		);

		// If the content is still loading, then this is rendered.
	} else if (contentLoading) {
		return <Loading />;

		// If the url parameter is "new" or its a number and it was found, this is rendered
	} else {
		return <PageNotFound />;
	}
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	isAuthenticated: state.token !== null,
	token: state.token !== null ? state.token : "",
	authLoading: state.loading,
});

export default connect(mapStateToProps)(NoteDetail);
