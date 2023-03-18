import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { loginUser, registerUser } from "../../app/store/users/action";
import { LoginUserInput, RegisterUserInput } from "../../app/store/users/types";
import { CONFIRM_PASSWORD, EMAIL_ADDRESS, EMPTY_STRING, FIRST_NAME, LAST_NAME, LOGIN, LOGIN_MESSAGE, PASSWORD, PASSWORD_NOT_MATCH, PROVIDE_EMAIL, PROVIDE_FIRSTNAME, PROVIDE_LASTNAME, PROVIDE_PASSWORD, PROVIDE_USERNAME, REGISTER, REGISTER_MESSAGE, SIGN_IN, SIGN_UP, SUBMIT, USER_NAME } from "../../app/utilities/constants";
import { VARIANT, FORM_TYPE, USER_FORM, ROUTE } from "../../app/utilities/enums";
import FormGroup from "../../app/components/Form/FormGroup";

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

	const handleSwitchForm = () => navigate(formType == USER_FORM.LOGIN ? ROUTE.REGISTER : ROUTE.LOGIN);

	const handleLogin = async () => {
		await dispatch(loginUser(loggedUser));
		navigate(ROUTE.HOME);
	};

	const handleRegister = async () => {
		await dispatch(registerUser(registeredUser))
		navigate(ROUTE.LOGIN);
	}

	const loginForm = formType == USER_FORM.LOGIN;

	const registerForm = formType == USER_FORM.REGISTER;

	return (
		<Col
			md={{ span: 4, offset: 4 }}
			className="mt-5"
		>
			<Card className="w-100">
				<Card.Header>
					{loginForm ? LOGIN : REGISTER}
				</Card.Header>

				<Form className="p-5">
					{registerForm &&
						<>
							<Row>
								<Col>
									<FormGroup
										label={FIRST_NAME}
										type={FORM_TYPE.TEXT}
										placeholder={FIRST_NAME}
										isRequired={true}
										validationMessage={PROVIDE_FIRSTNAME}
										onChange={(value) => setRegisteredUser((prev) => ({ ...prev, firstName: value }))}
									/>
								</Col>

								<Col>
									<FormGroup
										label={LAST_NAME}
										type={FORM_TYPE.TEXT}
										placeholder={LAST_NAME}
										isRequired={true}
										validationMessage={PROVIDE_LASTNAME}
										onChange={(value) => setRegisteredUser((prev) => ({ ...prev, lastName: value }))}
									/>
								</Col>
							</Row>

							<FormGroup
								label={USER_NAME}
								type={FORM_TYPE.TEXT}
								placeholder={USER_NAME}
								isRequired={true}
								validationMessage={PROVIDE_USERNAME}
								onChange={(value) => setRegisteredUser((prev) => ({ ...prev, userName: value }))}
							/>
						</>
					}

					<FormGroup
						label={EMAIL_ADDRESS}
						type={FORM_TYPE.EMAIL}
						placeholder={EMAIL_ADDRESS}
						isRequired={registerForm && true}
						validationMessage={PROVIDE_EMAIL}
						onChange={(value) =>
							loginForm
								? setLoggedUser((prev) => ({ ...prev, email: value }))
								: setRegisteredUser((prev) => ({ ...prev, email: value }))
						}
					/>

					<FormGroup
						label={PASSWORD}
						type={FORM_TYPE.PASSWORD}
						placeholder={PASSWORD}
						isRequired={registerForm && true}
						validationMessage={PROVIDE_PASSWORD}
						onChange={(value) =>
							loginForm
								? setLoggedUser((prev) => ({ ...prev, password: value }))
								: setRegisteredUser((prev) => ({ ...prev, password: value }))
						}
					/>

					{registerForm &&
						<FormGroup
							label={CONFIRM_PASSWORD}
							type={FORM_TYPE.PASSWORD}
							placeholder={CONFIRM_PASSWORD}
							isRequired={true}
							validationMessage={PASSWORD_NOT_MATCH}
							onChange={(value) => setRegisteredUser((prev) => ({ ...prev, confirmPassword: value }))}
						/>
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
