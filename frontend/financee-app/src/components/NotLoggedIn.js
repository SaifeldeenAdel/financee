import React from 'react'
import styled from "styled-components";
import { ErrorPageContainer, ErrorPageHeading } from './styles/Alert-styles'
import { CustomBtn, LinkDiv } from './styles/Alert-styles'
import { EmptyVoid } from "./styles/iconComponents";


const EmptyVoidIcon = styled(EmptyVoid)`
    @media screen and (max-width: 600px) {
        height: 150px;
        width: 150px;
    }
`

function NotLoggedIn() {
    return (
        <ErrorPageContainer>
            <ErrorPageHeading>
                Only logged in users can use this feature.
            </ErrorPageHeading>
            <LinkDiv>
                <CustomBtn to="/login">Login</CustomBtn>
                <CustomBtn to="/register">Register</CustomBtn>
            </LinkDiv>
            <EmptyVoidIcon />
		</ErrorPageContainer>
    )
}

export default NotLoggedIn
