import React from "react";
import { NavLink as Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {authLogout} from '../redux/actions/actions'
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const SideBarContainer = styled.aside`
	position: fixed;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: var(--main-blue);
	display: grid;
	align-items: center;
	top: 0;
	left: 0;
	transition: 0.3s ease-in-out;
	opacity: ${({ isOpen }) => isOpen ? '100%' : "0"};
    top: ${({ isOpen }) => isOpen ? "0" : "-100%"}; 
`;

const CloseIcon = styled(FaTimes)`
	color: var(--main-white);
`;

const Icon = styled.div`
	position: absolute;
	top: 1.2rem;
	right: 1.5rem;
	background: transparent;
	font-size: 2rem;
	cursor: pointer;
	outline: none;
`;


const SidebarWrapper = styled.div `
    color: var(--main-white);
    
`

const SidebarMenu = styled.ul `
    font-family: 'M PLUS Rounded 1c', sans-serif;
    letter-spacing: 1px;
    font-weight: 200;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 55px);
    text-align: center;

    @media screen and (max-width: 580px) {
        grid-template-rows: repeat(6, 45px);

    }
`

const SidebarLink = styled(Link) `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    color: var(--main-white);
    cursor: pointer;

    &:hover{
        color: var(--main-yellow);
    }
    
`

const SidebtnWrap = styled.div `
    display: flex;
    justify-content: center;

`

const SidebarBtn = styled(Link) `
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-weight: 400;
    border-radius: 50px;
    background-color: var(--lighter-blue);
    padding: 10px 22px;
    color: var(--main-white);
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-decoration: none;

    &:hover {
        background-color: var(--main-yellow);
        color: var(--main-blue)
    }

`

const SidebarLabel = styled.div `
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 11pt;
    color: var(--main-white);
    margin-bottom: 20px;
    text-align: center;


`

function SideBar({isOpen, toggle, user, isAuthenticated, logout}) {
	return (
		<SideBarContainer isOpen={isOpen} onClick={toggle}>
			<Icon onClick={toggle}>
				<CloseIcon />
			</Icon>
			<SidebarWrapper>
				<SidebarMenu>
					<SidebarLink to="/trade-calculator" onClick={toggle}>Trade Calculator</SidebarLink>
					<SidebarLink to="/tradebills" onClick={toggle}>Tradebills</SidebarLink>
					<SidebarLink to="/notes" onClick={toggle}>Notes</SidebarLink>
                    <SidebarLink to="/stock-lookup" onClick={toggle}>Stock Lookup</SidebarLink>
					<SidebarLink to="/watchlist" onClick={toggle}>Watchlist</SidebarLink>
				</SidebarMenu>
                <SidebtnWrap>
                    {
                        !isAuthenticated ? 
                        <SidebarBtn to="/login">Login</SidebarBtn> :
                        <>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <SidebarLabel>Signed in as {user.username}</SidebarLabel>
                                <div><SidebarBtn to="#" onClick={() => logout()}>Logout</SidebarBtn></div>

                            </div>
                        </>

                    }
                </SidebtnWrap>
			</SidebarWrapper>
		</SideBarContainer>
	);
}


const mapStateToProps = (state) => ({
    isAuthenticated : state.token ? true : false
    
})

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(authLogout())
})


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
