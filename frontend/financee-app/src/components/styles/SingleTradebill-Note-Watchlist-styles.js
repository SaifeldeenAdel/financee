import {Link} from 'react-router-dom'
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// General 
export const Container = styled(Link) `
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
	width: 100%;
    background-color: #f1f1f1;
    border: solid 2px #e1e1e1;
	font-family: var(--san-serif-2);
    font-weight: 300;
    color: var(--main-blue);
    transition: 0.3s ease-in-out;
    

    &:hover {
        color: var(--main-blue);
        background-color: #e6e6e6;

    }

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1000px) {
        padding: 5px 10px;
        font-size: 14pt;


	}

    @media screen and (max-width: 550px) {
        padding: 2px 8px;
        font-size: 12pt;

	}

`

export const LeftInfo = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;


`

export const RightInfo = styled.div `
    display: flex;
    align-items: center;
`


//------------
// Tradebill styles 
//------------

export const Size = styled.div `
    font-size: 15pt;
    min-width: 80px;
    text-align: center;

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1000px) {
        font-size: 13pt;
	}

    @media screen and (max-width: 550px) {
        font-size: 10pt;
        min-width: 60px;

	}
`

export const Symbol = styled.div `
    font-size: 15pt;
    font-weight: 400;
    margin-left: 20px;

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1000px) {
        font-size: 13pt;
	}

    @media screen and (max-width: 550px) {
        font-size: 10pt;
        margin-left: 10px;

	}
`


export const Status = styled.div `
    text-align: center;
    margin-right: ${props => props.status ? "30px" : "15px"};
    font-size: 12pt;
    font-weight: 500;

    color: ${props => props.status ? "green" : "red"};

    ${"" /* Responsive design for adjusting width */}
    @media screen and (max-width: 1000px) {
        font-size: 10pt;
    }

    @media screen and (max-width: 700px) {
        display: none;
    }
`

//------------
// Notes and Watchlist styles
//------------

export const Title = styled(Size) `
    font-weight: 500;
    text-align: left;

`


export const DateDiv = styled.div `
    font-size: 12pt;

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1000px) {
        font-size: 10pt;
	}

    @media screen and (max-width: 600px) {
        display: none;
	}

`

export const DeleteIconDiv = styled.div`
    padding: 0px 5px 0px 20px;
`

export const DotsIconDiv = styled.div `
    padding: 5px 20px 0px 0px;
`

export const DeleteIcon = styled(FontAwesomeIcon) `
    color: var(--main-blue);
    font-size: 16pt;
    transition: 0.3s ease-in-out;

    &:hover {
        color: #d40000
    }

    ${"" /* Responsive design for adjusting width */}
	@media screen and (max-width: 1000px) {
        font-size: 13pt;
	}

    @media screen and (max-width: 550px) {
        font-size: 11pt;
	}
`

export const DotsIcon = styled(FontAwesomeIcon) `
    color: #c6c6c6;
    font-size: 14pt;
`