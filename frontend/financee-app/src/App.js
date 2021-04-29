import "./App.css";
import "antd/dist/antd.css";
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from 'axios'
import {checkAuthState} from './redux/actions/actions'
import { MainLayout } from "./middlemen/imports";
import Routes from "./middlemen/Routes";

function App({ isAuthenticated, token, checkAuthState}) {

    const [user, setUser] = useState({})

    // Checks auth state whenever the app is opened to see if they should be logged out or not
    useEffect(() => {
        checkAuthState()
    }, [])

    // Gets the current user
    useEffect(() => {
        if (isAuthenticated) {
            const headers = {
                "headers" : {
                    "Authorization": `Token ${token}`
                }
            }
            axios.get('http://127.0.0.1:8000/api/profile', headers)
            .then(response => {
                setUser(response.data)
            })
        }
    }, [isAuthenticated])
    
	return (
		<Router>
			<MainLayout user={user}>
				<Routes />
		    </MainLayout>
		</Router>
	);
}

// Redux- Mapping state and dispatch to props
const mapStateToProps = state => {
    return {
        isAuthenticated : state.token !== null ? true : false,
        token : state.token !== null ? state.token : "",
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState : () => dispatch(checkAuthState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
