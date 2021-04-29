import React from 'react'
import {ClimbingBoxLoader, GridLoader} from 'react-spinners'
import styled from 'styled-components'
import { MainContainer } from './styles/Main-styles'



const LoadingIconDiv = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 50px;
`

function Loading() {
    return (
        <MainContainer>
            <LoadingIconDiv>
                <GridLoader color="var(--second-yellow)" loading/>
            </LoadingIconDiv>
            
        </MainContainer>
    )
}

export default Loading
