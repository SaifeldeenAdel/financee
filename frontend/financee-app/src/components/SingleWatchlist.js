import {useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import { Modal } from 'antd';


import {Container, LeftInfo, RightInfo, DateDiv, DeleteIcon, DeleteIconDiv, Title, DotsIconDiv, DotsIcon} from './styles/SingleTradebill-Note-Watchlist-styles'

import {
    faEllipsisV,
    faTrash
} from "@fortawesome/free-solid-svg-icons";


function SingleWatchlist({token, watchlist_item, getWatchlist}) {

    const headers = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    // function for deleting watchlist_item
    const handleDelete = (event) => {
        event.preventDefault()
        axios
			.delete(`http://127.0.0.1:8000/api/remove-from-watchlist/${watchlist_item.id}`, headers)
        .then(response => {
            getWatchlist()
        })
        
        .catch(error => {
            console.log(error.response.data)
        })
    };
    

    return (
        <>
            <Container to={`/watchlist/${watchlist_item.id}`}>
                <LeftInfo>
                    <DotsIconDiv>
                        <DotsIcon  icon={faEllipsisV} />
                    </DotsIconDiv>
                    <Title>
                        $   {watchlist_item.symbol}
                    </Title>

                </LeftInfo>

                <RightInfo>
                    <DeleteIconDiv>
                        <DeleteIcon  icon={faTrash} onClick={handleDelete} />
                    </DeleteIconDiv>

                </RightInfo>
                
            </Container>
        </>
    )
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	token: state.token !== null ? state.token : "",
});

export default connect(mapStateToProps)(SingleWatchlist);
