import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { ServerError } from './iconComponents'
import { AutoCompleteInput } from './Main-styles'

export const SearchContainer = styled.div `
    width: 100%;
    display: flex;


    ${"" /* Responsive design for adjusting positioning */}
	@media screen and (max-width: 780px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`

export const AutoCompleteSearch = styled(AutoCompleteInput) `
    width: 100%;
    ${"" /* Responsive design for adjusting positioning */}
	@media screen and (max-width: 780px) {
	}

`
export const SearchBox = styled.input `
    border: none;
    outline: none;
    border-radius: 10px;
    width: 100%;
    background-color: #efefef;
    padding: 10px 25px;
    font-family: var(--san-serif-2);
	font-weight: 200;
    font-size: 16pt;
    transition: 0.3s ease-in-out;

    &:hover {
        background-color: #ececec;

    }
`

export const StockContainer = styled.div `
    margin-top: 60px
`

export const Details = styled.div `
    margin-top: 10px;
    font-family: var(--san-serif-2);
    font-size: 13pt;
    font-weight: 400;

    @media screen and (max-width: 500px) {
        font-size: 11pt;

	}

`

export const Price = styled.span `
    color: ${props => props.status === "green" ? "#26D162" : "#E62F08" };
`

export const ChartContainer = styled.div `
    margin-top: 50px;
    padding: 20px;
`

export const ServerErrorDiv = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: var(--san-serif);
    font-size: 19pt;
    font-weight: 300;
    text-align: center;

    ${"" /* Responsive design for changing font size */}
	@media screen and (max-width: 500px) {
		font-size: 14pt;
	}
`

export const ServerErrorIcon = styled(ServerError) `

    ${"" /* Responsive design for changing height and width of icon */}
	@media screen and (max-width: 500px) {
		height: 200px;
		width: 200px;
	}
`

export const WatchlistButtonDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 300px;
    background: ${props => props.remove ? "var(--second-yellow)" : "var(--main-blue)"};
    color: ${props => props.remove ? "var(--main-blue)" : "var(--main-white)"};
    font-weight: 300;
    font-size: 14pt;
    padding: 10px 30px;
    border-radius: 90px;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        background: ${props => props.remove ? "#ffc95c" : "var(--lighter-blue)"};
        color:  ${props => props.remove ? "var(--main-blue)" : "var(--main-white)"}
    }

    ${"" /* Responsive design for changing positioning of items */}
	@media screen and (max-width: 500px) {
        width: 200px;
        font-size: 11pt;
        padding: 5px;

		
	}

`

export const WatchlistIcon = styled(FontAwesomeIcon) `
    font-size: 19px;
    color: var(--main-white);
    
    margin-right: 13px;
    margin-top: 6px;
`