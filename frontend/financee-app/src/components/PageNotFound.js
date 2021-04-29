import React from 'react'
import styled from "styled-components";
import { ErrorPageContainer, ErrorPageHeading } from './styles/Alert-styles';
import { NotFound } from './styles/iconComponents'
import { CustomBtn } from './styles/Alert-styles'


const NotFoundIcon = styled(NotFound)`
    @media screen and (max-width: 600px) {
        height: 200px;
        width: 200px;
    }
`

function PageNotFound() {
    return (
        <ErrorPageContainer>
				<ErrorPageHeading>
					Are you lost? This page doesn't exist.
				</ErrorPageHeading>
				<NotFoundIcon />
                <CustomBtn to="/">
                    Home
                </CustomBtn>
		</ErrorPageContainer>
    )
}

export default PageNotFound
