import { Link } from "react-router-dom";
import styled from "styled-components";
import { InvestingIcon } from "./iconComponents/index";

export const HomeMainContainer = styled.div`
	display: flex;
	height: 100vh;
	padding-top: 0px;
	min-height: 200px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #293651;

    @media screen and (max-width: 700px) {
		padding-top: 200px;
	}

	${"" /* Responsive design for preventing text to go under fixed position */}
	@media screen and (max-height: 760px) {
		padding-top: 250px;
		padding-bottom: 150px;
	}

	@media screen and (max-height: 590px) {
		padding-top: 380px;
		padding-bottom: 300px;
	}
`;

export const Logo = styled.h1`
	font-family: "Bodoni Moda", serif;
	font-size: 92pt;
	font-weight: 700;
	color: #293651;
	margin-bottom: -20px;

	${"" /* Responsive design for adjusting font size and margin */}
	@media screen and (max-width: 700px) {
		font-size: 60pt;
	}

	@media screen and (max-width: 400px) {
		font-size: 40pt;
		margin-bottom: -10px;
	}
`;

export const UnderLogo = styled.h2`
	text-align: center;
	font-family: "M PLUS Rounded 1c", sans-serif;
	font-size: 17pt;
	font-weight: 300;

	${"" /* Responsive design for adjusting font size */}
	@media screen and (max-width: 700px) {
		font-size: 13pt;
	}

	@media screen and (max-width: 400px) {
		font-size: 8pt;
	}
`;

export const Content = styled.div`
	display: flex;
	align-items: center;

	${"" /* Responsive design for changing positioning of items */}
	@media screen and (max-width: 700px) {
		flex-direction: column;
		margin-bottom: 80px;
	}
`;

export const InvestingIconn = styled(InvestingIcon)`
	margin-left: -30px;

	${"" /* Responsive design for changing positioning of items */}
	@media screen and (max-width: 400px) {
		height: 250px;
		width: 250px;
	}
`;

export const List = styled.ul`
	list-style: none;
	margin-left: 40px;

	${"" /* Responsive design for removing margin */}
	@media screen and (max-width: 700px) {
		margin-left: 0px;
	}
`;

export const ListItems = styled.li`
	margin-top: 3px;

	${"" /* Adding custom bullet point */}
	&:before {
		content: "•";
		color: #ffad05;
		margin-right: 10px;
	}
`;

export const ListLink = styled(Link)`
	font-family: "M PLUS Rounded 1c", sans-serif;
	font-size: 15pt;
	font-weight: 300;
	transition: 0.2s;
	text-decoration: none;
	color: #293651;

	&:hover {
		color: #ffad05;
	}

	${"" /* Responsive design for adjusting font size */}
	@media screen and (max-width: 400px) {
		font-size: 12pt;
	}
`;