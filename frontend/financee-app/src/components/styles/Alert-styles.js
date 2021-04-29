import styled from "styled-components";
import {Link} from 'react-router-dom'


export const ErrorPageContainer = styled.div`
	display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 150px;
`;

export const ErrorPageHeading = styled.h1`
	font-family: var(--san-serif);
	font-size: 22pt;
	font-weight: 300;
    text-align: center;

    @media screen and (max-width: 600px) {
        font-size: 15pt;
    }
`;

export const LinkDiv = styled.div `
    display: flex;
    margin-bottom: 60px;
`


export const CustomBtn = styled(Link)`
	background-color: var(--lighter-blue);
	color: var(--main-white);
	padding: 8px 20px;
	outline: none;
	border: none;
	border-radius: 20px;
	font-family: "Mulish", sans-serif;
	font-size: 13pt;
	font-weight: 300;
	margin-right: 10px;
	transition: 0.3s ease-in-out;

	&:hover {
		background-color: var(--main-yellow);
		color: black;
	}

    @media screen and (max-width: 600px) {
        font-size: 9pt;
    }
`;