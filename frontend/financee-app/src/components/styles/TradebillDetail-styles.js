import { Select, Checkbox } from 'antd'
import styled from 'styled-components'
import { Button } from "./Main-styles"
import { Form, FormRow } from './TradeCalc-styles'


export const Section = styled.div `
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`

export const LeftOutline = styled.div `
    margin-left: 17px;
    border-radius: 40px;
    width: 4px;
    height: 100px;
    background-color: var(--main-blue);

    @media screen and (max-width: 1100px) {
        display: none;
    }
`

export const NumberDiv = styled.div `
    text-align: center;
    width: 35px;
    font-family: var(--san-serif);
    font-size: 15pt;
    font-weight: 300;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 50%;
    color: var(--main-white);
    background-color: var(--main-blue);

    @media screen and (max-width: 1100px) {
        display: none;
    }


`

export const Grid = styled.div `
    display: grid;
    grid-template-columns: 0.85fr repeat(4, 1fr);
    grid-template-rows: repeat(7, auto);
    grid-template-areas: "cell-1 header1 header2 header3 header4"
    "sideHeader1 cell-2 cell-3 cell-4 cell-5"
    "sideHeader2 cell-6 cell-7 cell-8 cell-9"
    "sideHeader3 cell-10 cell-11 cell-12 cell-13"
    "sideHeader4 cell-14 cell-15 cell-16 cell-17"
    "sideHeader5 cell-18 cell-19 cell-20 cell-21"
    "cell-22 cell-23 cell-24 cell-25 cell-26";


    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr 1.5fr;
        grid-template-rows: repeat(7, auto);

        grid-template-areas: "cell-1 header4"
        "sideHeader1 cell-5"
        "sideHeader2 cell-9"
        "sideHeader3 cell-13"
        "sideHeader4 cell-17"
        "sideHeader5 cell-21"
        "cell-22 cell-26";
        
        
    }

`

export const Cell = styled.div `
    display: ${props => props.total ? "flex" : ""};
    justify-content: ${props => props.total ? "center" : ""};
    text-align: center;
    padding: 5px;
    padding-bottom: ${props => props.lastRow ? "20px" : ""};
    
    border-right: ${props => props.total ? "" : "1px solid var(--main-blue)"};
    border-top: ${props => props.header ? "1px solid var(--main-blue)" : ""};
    border-bottom: ${props => props.lastRow  ? "1px solid var(--main-blue)" : ""};


    font-family: var(--san-serif-2);
    font-weight: ${props => props.header || props.sideheader ? "800" : "300"};
    font-size: 13pt;

    ${'' /* Checks which props is passed and assigns a grid-area accordingly */}
    ${props => {
        if (props.sideheader) {
        return `
            grid-area: ${props.sideheader};
        `
        } else if (props.header) {
        return `
            grid-area: ${props.header};

        `
        } else {
        return `
            grid-area: ${props.cell};

        `
        }
    }};

    @media screen and (max-width: 1100px) {
        font-size: 12pt;
    }

    @media screen and (max-width: 900px) {
        font-size: 10pt;
    }

    @media screen and (max-width: 600px) {
        display: ${props => 
            (props.header && props.header !== "header4") 
            ? "none" 
            : (props.cell === "cell-2" || 
            props.cell === "cell-3" || 
            props.cell === "cell-4" ||
            props.cell === "cell-6" ||
            props.cell === "cell-7" || 
            props.cell === "cell-8" ||
            props.cell === "cell-10" || 
            props.cell === "cell-11" || 
            props.cell === "cell-12" ||
            props.cell === "cell-14" ||
            props.cell === "cell-15" || 
            props.cell === "cell-16" ||
            props.cell === "cell-18" ||
            props.cell === "cell-19" || 
            props.cell === "cell-20") ? "none" : ""};
    }

`

export const CustomSelect = styled(Select)`
    width: 95px;

    @media screen and (max-width: 900px) {
        width: 75px;
    }
`

export const Total = styled.div `
    margin-top: 10px;
    padding: 5px;
    background: ${props => props.status === "red" ? "rgba(255, 105, 97, 0.6)" : "rgba(193, 225, 193, 1)"};
    width: 50%;
    border-radius: 40px;

`


export const TradebillForm = styled(Form)`
    padding: 0px 30px;
    margin: 30px 0px;

`

export const TradebillFormRow = styled(FormRow)`
    justify-content: ${props => props.center ? "center" : "flex-start" };
    margin-left: ${props => props.center ? "" : "12%" };
    margin-bottom: 20px;

	@media screen and (max-width: 780px) {
        margin-left: 0px;
    }

`


export const CheckboxGroup = styled(FormRow) `
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
`

export const Check = styled(Checkbox) `
    font-family: var(--san-serif-2);
    font-weight: 300;
    font-size: 15pt;
`


export const FormTextArea = styled.textarea `
    background-color: ${(props) =>
		props.top ? "rgba(122,161,240, 0.3)" : "#EDEDED"};
	font-size: 14pt;
	font-family: var(--san-serif-2);
	font-weight: 300;
	padding: 10px 20px;
	border-radius: 10px;
	outline: none;
	border: none;
	transition: 0.2s ease-in-out;
	width: 230%;

	&:hover {
		background-color: ${(props) =>
			props.top ? "rgba(122,161,240, 0.4)" : "#E4E4E4"};
	}

	&::placeholder {
		color: ${(props) => props.top ? "rgba(122, 161, 240, 1)" : "#B1B1B1"} ;
	}

	@media screen and (max-width: 780px) {
        width: 100%;
        
    }
`


export const SubmitButton = styled(Button) `
    background-color: ${props => props.cancel ? "var(--main-blue)" : "var(--main-yellow)"} ;
    color: ${props => props.cancel ? "var(--main-white)" : "var(--main-blue)"} ;
    font-weight: 500;
    font-size: 14pt;
    padding: 10px 30px;
    border-radius: 90px;

    &:hover {
        color: var(--main-white)
    }

    @media screen and (max-width: 1100px) {
        font-size:11pt;
        
    }

    @media screen and (max-width: 780px) {
        font-size:14pt;
        
    }

`

export const Required = styled.div `
    font-size: 10;
    margin-top: 0;
    text-align: center;
    color: #D40000;
`