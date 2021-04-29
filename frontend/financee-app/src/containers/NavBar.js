import React, { useRef } from 'react'
import { NavLink as Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {authLogout} from '../redux/actions/actions'
import styled from 'styled-components'
import {FaBars} from 'react-icons/fa'
import { useTransition } from 'react-spring'


const Nav = styled.nav `
    position: fixed;
    width: 100%;
    background-color: var(--main-blue);
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0px calc((100vw - 1400px) / 2);
    z-index: 100;
    white-space: nowrap;
`

const NavLink = styled(Link)`
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size: 13pt;
    letter-spacing: 1px;
    font-weight: 200;
    background: ${props => props.logo ? "var(--darker-blue)" : ""};
    color: var(--main-white);
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0px 1.1rem;
    height: 100%;
    cursor: pointer;
    transition: 0.3s;


    &:hover{
        background: var(--second-yellow);
        color: var(--main-blue);
    }

`

const Bars = styled(FaBars)`
    display: none;
    color: var(--main-white);
    cursor: pointer;

    @media screen and (max-width:935px) {
        display: block;
        position: absolute;
        top: 0px;
        right: 0px;
        transform: translate(-100%, 70%);
        font-size: 1.8rem
    }
`

const Logo = styled.h1 `
    font-family: "Bodoni Moda", serif;
    margin-top: 9px;
    font-size: 23pt;
    font-weight: 600;
    color: var(--main-white);

    letter-spacing: 2px;
    

`
const NavMenu = styled.div `
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 935px) {
        display: none;
    }
    

`

const NavBtn = styled.nav `
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 935px) {
        display: none;
    }

`


const NavBtnLink = styled(Link) `
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-weight: 400;
    border-radius: 50px;
    background-color: ${props => props.disabled ? "var(--main-blue)" : "var(--lighter-blue)"};
    padding: 10px 22px;
    color: ${props => props.haha ? "red" : "var(--main-white)"};
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.5s;
    text-decoration: none;

    &:hover {
        background-color: var(--main-yellow);
        color: black;
    }
` 

const NavLabel = styled.div `
    font-family: 'M PLUS Rounded 1c', sans-serif;
    margin-right: 30px;
    font-size: 11pt;
    color: var(--main-white)
`


function NavBar({toggle, user, isAuthenticated, logout}) {
    return (
        <>
            <Nav>
                <NavLink to='/' logo="true">
                    <Logo>Financee</Logo>
                </NavLink>

                <Bars onClick={toggle}/>
                
                <NavMenu>
                    <NavLink to='/trade-calculator' activeStyle={{backgroundColor: "var(--main-yellow)", color: 'black'}}>
                        Trade Calculator
                    </NavLink>
                    <NavLink to='/tradebills' activeStyle={{backgroundColor: "var(--main-yellow)", color: 'black'}}>
                        Tradebills
                    </NavLink>
                    <NavLink to='/notes' activeStyle={{backgroundColor: "var(--main-yellow)", color: 'black'}}>
                        Notes
                    </NavLink>
                    <NavLink to='/stock-lookup' activeStyle={{backgroundColor: "var(--main-yellow)", color: 'black'}}>
                        Stock Lookup
                    </NavLink>
                    <NavLink to='/watchlist' activeStyle={{backgroundColor: "#FFBB33", color: 'black'}}>
                        Watchlist
                    </NavLink>
                    
                </NavMenu>
                

                {/* Conditional rendering on whether or not the user is authenticated or not */}
                <NavBtn>
                    {
                        !isAuthenticated ? 
                        <NavBtnLink to="/login">Login</NavBtnLink> :
                        <>
                            <NavLabel>Signed in as {user.username}</NavLabel>
                            <NavBtnLink to="#" onClick={() => logout()}>Logout</NavBtnLink>
                        </>

                    }


                </NavBtn>
                
            
            </Nav>
        </>
    )
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
    isAuthenticated : state.token ? true : false
    
})

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(authLogout())
})


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
