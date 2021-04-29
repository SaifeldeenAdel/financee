import {useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import { Modal } from 'antd';


import {Container, LeftInfo,RightInfo, DateDiv, DeleteIcon, DeleteIconDiv, Title, DotsIconDiv, DotsIcon} from './styles/SingleTradebill-Note-Watchlist-styles'

import {
    faEllipsisV,
    faTrash
} from "@fortawesome/free-solid-svg-icons";


function SingleNote({token, note, getNotes}) {

    const headers = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fucntion for showing modal
    const showModal = (event) => {
        setIsModalVisible(true);
    };

    // function for deleting note
    const handleDelete = (event) => {
        axios
			.delete(`http://127.0.0.1:8000/api/note-delete/${note.id}`, headers)
        .then(response => {
            getNotes()
        })
        
        .catch(error => {
            console.log(error.response.data)
        })
        setIsModalVisible(false);
    };
    

    // Cancelling on modal
    const handleCancel = (event) => {
        setIsModalVisible(false);
    };


    // On click on delete icon
    const handleIconClick = (event) => {
        event.preventDefault()
        showModal()
    }
    return (
        <>
            <Container to={`/notes/${note.id}`}>
                <LeftInfo>
                    <DotsIconDiv>
                        <DotsIcon  icon={faEllipsisV} />
                    </DotsIconDiv>
                    <Title>
                        {note.title}
                    </Title>

                </LeftInfo>

                <RightInfo>
                    <DateDiv>
                        Created on 
                        {new Date(note.created).toLocaleDateString()} at {new Date(note.created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </DateDiv>
                    <DeleteIconDiv>
                        <DeleteIcon  icon={faTrash} onClick={(event) => handleIconClick(event)} />
                    </DeleteIconDiv>

                </RightInfo>
                
            </Container>
            <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleDelete} onCancel={handleCancel} okText="Delete">
                    <p>Notes cannot be recovered after deletion.</p>
            </Modal>
        </>
    )
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
	token: state.token !== null ? state.token : "",
});

export default connect(mapStateToProps)(SingleNote);
