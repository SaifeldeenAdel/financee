import {useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import { Modal } from 'antd';

import {Container, LeftInfo, Size, Symbol, RightInfo, Status, DateDiv, DeleteIcon, DeleteIconDiv} from './styles/SingleTradebill-Note-Watchlist-styles'
import {
	faTrash
} from "@fortawesome/free-solid-svg-icons";

function SingleTradebill({token, tradebill, getTradebills}) {

    const headers = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (event) => {
        setIsModalVisible(true);
    };

    const handleDelete = (event) => {
        console.log("delete" + tradebill.id)
        axios
			.delete(`http://127.0.0.1:8000/api/tradebill-delete/${tradebill.id}`, headers)
        .then(response => {
            console.log(response)
            getTradebills()
        })
        .catch(error => {
            console.log(error.response.data)
        })
        setIsModalVisible(false);
    };
    
    const handleCancel = (event) => {
        setIsModalVisible(false);
    };

    const handleIconClick = (event) => {
        event.preventDefault()
        console.log("delete")
        showModal()
    }
    return (
        <>
            <Container to={`/tradebills/${tradebill.id}`}>
                <LeftInfo>
                    <Size>
                        {tradebill.size}
                    </Size>
                    <Symbol>
                        ${tradebill.symbol}&nbsp;@&nbsp;{tradebill.entry}
                    </Symbol>

                </LeftInfo>

                <RightInfo>
                    <Status status={tradebill.filled}>
                        {
                            tradebill.filled ? "Filled" : "Not Filled"
                        }
                    </Status>
                    <DateDiv>
                        {new Date(tradebill.created).toLocaleDateString()} at {new Date(tradebill.created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </DateDiv>
                    <DeleteIconDiv>
                        <DeleteIcon  icon={faTrash} onClick={(event) => handleIconClick(event)} />
                    </DeleteIconDiv>

                </RightInfo>
                
            </Container>
            <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleDelete} onCancel={handleCancel} okText="Delete">
                    <p>Tradebills cannot be recovered after deletion.</p>
            </Modal>
        </>
    )
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	token: state.token !== null ? state.token : "",
});

export default connect(mapStateToProps)(SingleTradebill);
