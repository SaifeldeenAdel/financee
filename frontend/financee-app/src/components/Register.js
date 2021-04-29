import {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import { useHistory} from 'react-router-dom'
import {authRegister} from '../redux/actions/actions'
import { BeatLoader } from 'react-spinners';
import { Form, Spin } from "antd";
import { SinginIcon } from "./styles/iconComponents/index";
import {
	MainContainer,
	Heading,
	CustomInput,
	CustomBtn,
	CustomLink,
    ErrorDiv,
    Error

} from "./styles/AuthForm-styles";



function Register({isAuthenticated, loading, error,register}) {
    const inputRef = useRef()
    
    // For focusing on input field
    useEffect(() => {
        document.title = "Register"
        inputRef.current.focus()
    }, [])


    let history = useHistory()

    // For checking if the user is authenticated and pushing the state to the home page
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
        }
        
    }, [isAuthenticated])


	const onFinish = (values) => {
		console.log("Received values of form: ", values);

        // Calls register dispatch function
        register(values.username, values.email, values.password, values.confirm)
	};

	return (
		<MainContainer>
			<Heading>Register</Heading>
			<SinginIcon />
            
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
					<CustomInput ref={inputRef} placeholder="Username" autoComplete="on" />
				</Form.Item>

				<Form.Item
					name="email"
					rules={[
						{
							type: "email",
							message: "Invalid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<CustomInput placeholder="Email" autoComplete="on" />
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
						placeholder="Password"
						type="password"
						autoComplete="on"
					/>
				</Form.Item>

				<Form.Item
					name="confirm"
					dependencies={["password"]}
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue("password") === value
								) {
									return Promise.resolve();
								}

								return Promise.reject(
									"The two passwords that you entered do not match!"
								);
							},
						}),
					]}
				>
					<CustomInput
						placeholder="Confirm Password"
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

                {/* Conditional rendering on error.response because error.response will mean error and response object exists and response object only exists when its a register error */}
                {
                    error.response &&
                    <ErrorDiv>
                        <Error>{error.response.data.username}</Error>
                        <Error>{error.response.data.email}</Error>
                        <Error>{error.response.data.password1}</Error>
                    </ErrorDiv> 

                }

				<Form.Item>
					<CustomBtn htmlType="submit">Register</CustomBtn>
					Or <CustomLink to="/login">login now!</CustomLink>
				</Form.Item>
			</Form>

            
		</MainContainer>
	);
}

// Redux mapping of state and dispatch
const mapStateToProps = (state) => ({
    isAuthenticated : state.token !== null,
    loading: state.loading,
    error: state.error ? state.error : ""
    
})

const mapDispatchToProps = (dispatch) => ({
    register : (username, email, password1, password2) => dispatch(authRegister(username, email, password1, password2))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register);

