import styled from 'styled-components'
import {animated} from 'react-spring'
import { AutoComplete } from 'antd';

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: left;
	padding: 0px 20vw;
	padding-top: 150px;
	text-align: left;
	padding-bottom: 50px;

	${"" /* Responsive design for adjusting padding */}
	@media screen and (max-width:1400px) {
		padding-right: 10vw;
		padding-left: 10vw;
	}

    @media screen and (max-width: 500px) {
		padding-right: 5vw;
		padding-left: 5vw;
	}
`;


export const ItemContainer = styled.div `
    margin-top: 10px;
    width: 60vw;

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1400px) {
		width: 80vw;
	}

    @media screen and (max-width: 500px) {
		width: 90vw;
	}
`

export const Heading = styled.h1`
	font-family: var(--san-serif);
	font-size: 26pt;
	font-weight: 300;
    text-align: ${props => props.center ? "center;" : ""};

    @media screen and (max-width: 550px) {
        font-size: 21pt;

	}

    @media screen and (max-width: 400px) {
        font-size: 17pt;

	}
`;

export const Seperator = styled.div`
	width: 60vw;
	height: 2px;
	background-color: var(--main-blue);

	${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1400px) {
		width: 80vw;
	}

    @media screen and (max-width: 500px) {
		width: 90vw;
	}
`;

export const Button = styled.button`
	margin-top: 10px;
	margin-bottom: 10px;
    margin-left: ${props => props.additional ? "10px" : ""};
	padding: 7px 20px;
	border-radius: 20px;
	background: ${props => props.additional ? "#4E6799" : "var(--main-blue)"};
	color: var(--main-white);
	font-family: var(--san-serif);
	font-size: 11pt;
	border: none;
	outline: none;
	transition: 0.3s ease-in-out;

	&:hover {
		background: var(--lighter-blue);
	}

	&:active {
		background: var(--main-yellow);
		transition: 0.2s;
	}
`;

export const InfoDiv = styled(animated.div)`
	background: #efefef;
	overflow: auto;
	font-family: var(--san-serif-2);
	font-size: 14pt;
	font-weight: 400;
	line-height: 24px;
	border: none;
	border-radius: 20px;

    
`;

export const AutoCompleteInput = styled(AutoComplete) `

    ${"" /* Responsive design for adjusting padding and width of for fields */}
	@media screen and (max-width: 780px) {
		width: 300px;
	}
`

