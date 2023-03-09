import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, registerUser } from "../../store/users/action";
import { LoginUserInput, RegisterUserInput } from "../../store/users/types";
import { CONFIRM_PASSWORD, EMAIL_ADDRESS, EMPTY_STRING, FIRST_NAME, LAST_NAME, LOGIN, LOGIN_MESSAGE, PASSWORD, REGISTER, REGISTER_MESSAGE, SIGN_IN, SIGN_UP, SUBMIT, USER_NAME } from "../../utilities/constants";
import { VARIANT, FORM_TYPE, USER_FORM, PATH_NAME } from "../../utilities/enums";

interface Props {
	formType: USER_FORM
}

const LoginPage = ({ formType }: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isFetching, user } = useAppSelector(state => state.user);

	const [loggedUser, setLoggedUser] = useState<LoginUserInput>({
		email: EMPTY_STRING,
		password: EMPTY_STRING,
	});
	const [registeredUser, setRegisteredUser] = useState<RegisterUserInput>({
		firstName: EMPTY_STRING,
		lastName: EMPTY_STRING,
		userName: EMPTY_STRING,
		email: EMPTY_STRING,
		password: EMPTY_STRING,
		confirmPassword: EMPTY_STRING,
	});


	const handleSwitchForm = () => navigate(formType == USER_FORM.LOGIN ? PATH_NAME.REGISTER : PATH_NAME.LOGIN);

	const handleLogin = async () => {
		await dispatch(loginUser(loggedUser));
		navigate(PATH_NAME.HOME);
	};

	const handleRegister = async () => {
		await dispatch(registerUser(registeredUser))
		navigate(PATH_NAME.LOGIN);
	}

	const loginForm = formType == USER_FORM.LOGIN;

	const registerForm = formType == USER_FORM.REGISTER;

	return (
		<Col md={{ span: 4, offset: 4 }} className="mt-5">
			<Card className="w-100">
				<Card.Header>
					{loginForm ? LOGIN : REGISTER}
				</Card.Header>

				<Form className="p-5">
					{registerForm &&
						<>
							<Row>
								<Col>
									<Form.Group className="mb-3 me-2">
										<Form.Label>{FIRST_NAME}</Form.Label>
										<Form.Control
											type={FORM_TYPE.TEXT}
											placeholder={FIRST_NAME}
											onChange={evt => setRegisteredUser(prev => ({ ...prev, firstName: evt.target.value }))}
										/>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group className="mb-3 ms-2">
										<Form.Label>{LAST_NAME}</Form.Label>
										<Form.Control
											type={FORM_TYPE.TEXT}
											placeholder={LAST_NAME}
											onChange={evt => setRegisteredUser(prev => ({ ...prev, lastName: evt.target.value }))}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>{USER_NAME}</Form.Label>
								<Form.Control
									type={FORM_TYPE.TEXT}
									placeholder={USER_NAME}
									onChange={evt => setRegisteredUser(prev => ({ ...prev, userName: evt.target.value }))}
								/>
							</Form.Group>
						</>
					}

					<Form.Group className="mb-3">
						<Form.Label>{EMAIL_ADDRESS}</Form.Label>
						<Form.Control
							type={FORM_TYPE.EMAIL}
							placeholder={EMAIL_ADDRESS}
							onChange={evt =>
								loginForm
									? setLoggedUser(prev => ({ ...prev, email: evt.target.value }))
									: setRegisteredUser(prev => ({ ...prev, email: evt.target.value }))
							}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>{PASSWORD}</Form.Label>
						<Form.Control
							type={FORM_TYPE.PASSWORD}
							placeholder={PASSWORD}
							onChange={evt =>
								loginForm
									? setLoggedUser(prev => ({ ...prev, password: evt.target.value }))
									: setRegisteredUser(prev => ({ ...prev, password: evt.target.value }))
							}
						/>
					</Form.Group>

					{registerForm &&
						<Form.Group className="mb-3">
							<Form.Label>{CONFIRM_PASSWORD}</Form.Label>
							<Form.Control
								type={FORM_TYPE.PASSWORD}
								placeholder={CONFIRM_PASSWORD}
								onChange={evt => setRegisteredUser(prev => ({ ...prev, confirmPassword: evt.target.value }))}
							/>
						</Form.Group>
					}

					<Form.Group className="mb-3">
						{loginForm ? REGISTER_MESSAGE : LOGIN_MESSAGE}
						<span
							role="button"
							className="ps-1 pointer text-primary"
							onClick={handleSwitchForm}
						>
							{loginForm ? SIGN_UP : SIGN_IN}
						</span>
					</Form.Group>

					<Button
						variant={VARIANT.PRIMARY}
						onClick={loginForm ? handleLogin : handleRegister}
					>
						{SUBMIT}
					</Button>
				</Form>
			</Card>
		</Col>
	)
}

export default LoginPage;
