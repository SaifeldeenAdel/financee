import styled from 'styled-components'
import { EmptyBox } from './iconComponents'

export const EmptyDiv = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: var(--san-serif);
    font-size: 19pt;
    font-weight: 300;
    text-align: center;

    ${"" /* Responsive design for changing font size*/}
	@media screen and (max-width: 500px) {
		font-size: 14pt;
	}
`

export const EmptyBoxIcon = styled(EmptyBox) `

    ${"" /* Responsive design for changing height and width of icon */}
	@media screen and (max-width: 500px) {
		height: 200px;
		width: 200px;
	}
`