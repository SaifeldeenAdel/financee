import {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {authLogin} from '../redux/actions/actions'
import { Form, Spin } from "antd";
import { LoginIcon } from "./styles/iconComponents/index";
import {
	MainContainer,
	Heading,
	CustomInput,
	CustomLink,
	CustomBtn,
    ErrorDiv,
    Error
} from "./styles/AuthForm-styles";
import { BeatLoader, GridLoader } from 'react-spinners';



function Login({history, isAuthenticated, loading, error, login}) {
    const inputRef = useRef()
    
    // For focusing on input field
    useEffect(() => {
        document.title = "Login"
        inputRef.current.focus()
    }, [])


    // For checking if the user is authenticated and pushing the state to the home page
    useEffect(() => {
        if (isAuthenticated) {
            history.goBack()
        }
        
    }, [isAuthenticated])


	const onFinish = (values) => {
        // Calling the login function on the recieved values
        login(values.username, values.password)
	};



	return (
		<MainContainer>
			<Heading>Login</Heading>
			<LoginIcon />
			<Form
				name="normal_login"
				className="login-form"
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your Username!",
						},
					]}
				>
					<CustomInput ref={inputRef} login='true' placeholder="Username" autoComplete="on" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
						{
							min: 8,
							message: "Password must be 8 characters or more",
						},
					]}
				>
					<CustomInput
                        login='true'
						placeholder="Password"
						type="password"
						autoComplete="on"
					/>
				</Form.Item>

                {/* Shows spinner when loading */}
                {
                    loading &&
                    <div>
                        <BeatLoader color="var(--main-blue)" size={10} />
                    </div>

                }

                {/* Conditional rendering on error.response because error.response will mean error exists but response object doesnt and response object only exists when its a register error */}
                {
                    (!error.response && error )&&
                    <ErrorDiv>
                        <Error>Incorrect username or password</Error>
                    </ErrorDiv>

                }

				<Form.Item>
					<CustomBtn htmlType="submit">Login</CustomBtn>
					Or <CustomLink to="/register">register now!</CustomLink>
				</Form.Item>
			</Form>
		</MainContainer>
	);
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
    isAuthenticated : state.token !== null,
    loading : state.loading,
    error : state.error ? state.error : "",

})

const mapDispatchToProps = (dispatch) => ({
    login : (username, password) => dispatch(authLogin(username, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);
