import { Link } from "react-router-dom";
import { Input } from "antd";
import styled from "styled-components";

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 100px;
	text-align: center;
`;

export const Heading = styled.h1`
	font-family: "M PLUS Rounded 1c", sans-serif;

	font-size: 26pt;
	font-weight: 300;
`;

export const CustomInput = styled(Input)`
	background-color: #f5f5f5;
	border: 0.2px solid #d1d1d1;
	border-radius: 4px;
	padding: 8px 18px;
	width: ${props => props.login ? "290px" : "340px"};
	font-family: "Mulish", sans-serif;
	font-weight: 300;
	font-size: 13pt;
	outline: none;
	transition: 0.3s ease-in-out;

	&:hover {
		background-color: #f2f2f2;
        
	}

	&::placeholder {
		color: #ababab;
		font-weight: 200;
	}

    @media screen and (max-width: 400px) {
        width: 280px;
    }
`;

export const CustomBtn = styled.button`
	background-color: var(--main-blue);
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
`;

export const CustomLink = styled(Link)`
	font-family: "Mulish", sans-serif;
	font-size: 12pt;
	font-weight: 400;
	color: var(--main-blue);
	text-align: center;

	&:hover {
		color: var(--main-yellow);
	}
`;

export const ErrorDiv = styled.div `
	padding: 0px 0px 20px 0px
`
export const Error = styled.div `
	font-family: "Mulish", sans-serif;
    padding: 0px 0px;
    color: #D40000
`