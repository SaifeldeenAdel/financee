import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "antd";
import { animated } from "react-spring";


export const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 100px;

	${"" /* Responsive design for adjusting margin */}
	@media screen and (max-width: 780px) {
		margin-bottom: 50px;
	}
`;

export const FormRow = styled.div`
	display: flex;

	${"" /* Responsive design for adjusting positioning */}
	@media screen and (max-width: 780px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: ${(props) => (props.last ? "" : "10px")};
	width: ${(props) => (props.cancel ? "15%" : "25%")};
    margin-top: 10px;

	${"" /* Responsive design for adjusting padding and width of for fields */}
	@media screen and (max-width: 780px) {
		width: ${(props) => (props.cancel ? "150px" : "300px")};
		padding-right: 0px;
	    margin-top: 15px;

	}
`;
export const FormLabel = styled.label`
	color: ${props => props.validation ? "#D40000" : "var(--main-blue)"} ;
	font-family: var(--san-serif-2);
	font-weight: 300;
	font-size: ${props => props.validation ? "9pt" : "15pt"};
	white-space: nowrap;
    padding-top: ${props => props.validation ? "3px" : ""};
    text-align: ${props => props.center ? "center" : ""}
`;

export const IconInputDiv = styled.div`
	position: relative;
`;

export const FormInput = styled.input`
	background-color: ${(props) =>
		props.top ? "rgba(122,161,240, 0.3)" : "#EDEDED"};
	font-size: 14pt;
	font-family: var(--san-serif-2);
	font-weight: 300;
	padding: ${(props) =>
		props.percent ? "10px 10px 10px 50px" : "10px 20px 10px 40px"};
	border-radius: 10px;
	outline: none;
	border: none;
	transition: 0.2s ease-in-out;
	width: 100%;

	&:hover {
		background-color: ${(props) =>
			props.top ? "rgba(122,161,240, 0.4)" : "#E4E4E4"};
	}

	&::placeholder {
		color: ${(props) => props.top ? "rgba(122, 161, 240, 1)" : "#B1B1B1"} ;
	}
`;



export const Icon = styled(FontAwesomeIcon)`
	height: 20px;
	position: absolute;
	left: 15px;
	top: 15px;
	color: ${(props) => (props.grey ? "#B1B1B1" : "rgba(122,161,240, 1)")};
`;

export const Result = styled.div`
	display: flex;
	justify-content: center;
	font-size: ${props => props.title ? "17pt" : "20pt" };
	font-family: var(--san-serif-2);
	font-weight: ${props => props.title ? "200" : "400" };
	text-align: center;

	${"" /* Responsive design for adjusting font size*/}
	@media screen and (max-width: 780px) {
		font-size: ${props => props.title ? "15pt" : "17pt" };

	}

	${"" /* Responsive design for adjusting font size*/}
	@media screen and (max-width: 400px) {
        font-size: ${props => props.title ? "14pt" : "15pt" };

	}
`;
