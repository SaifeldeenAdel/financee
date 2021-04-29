import React from 'react'
import { EmptyBoxIcon, EmptyDiv } from './styles/Empty-styles'

function Empty({item}) {
    return (
        <EmptyDiv>
            <EmptyBoxIcon />
            <div>
                No {item} yet
            </div>
        </EmptyDiv>
    )
}

export default Empty
