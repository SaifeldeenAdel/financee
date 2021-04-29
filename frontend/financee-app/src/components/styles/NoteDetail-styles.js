import styled from 'styled-components'
import { SubmitButton } from './TradebillDetail-styles'
import { FormLabel } from './TradeCalc-styles'

export const NoteTitle = styled.input `
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

export const NoteContent = styled.textarea `
    min-height: 200px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 10px 25px;
    background-color: #efefef;
    font-family: var(--san-serif-2);
	font-weight: 200;
    font-size: 16pt;

    &:hover {
        background-color: #ececec;

    }

    @media screen and (max-width: 500px) {
        min-height: 400px;
    }
`

export const NoteLabel = styled(FormLabel) `
    font-size: 16pt;
    font-weight: 500;
    margin-top: 30px;
`

export const NoteSubmitButton = styled(SubmitButton) `
    margin-left: 10px;

    @media screen and (max-width: 1100px) {
        font-size:11pt;
        padding: 10px 20px;
        
    }

`

export const Required = styled.div `
    font-size: 10pt;
    text-align: center;
    color: #D40000;

    @media screen and (max-width: 1100px) {
        font-size:9pt;
        
    }
`