import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUser } from "../../store/users/action";
import { LoginUser, RegisterUser } from "../../store/users/types";
import { CONFIRM_PASSWORD, EMAIL_ADDRESS, EMPTY_STRING, FIRST_NAME, LAST_NAME, LOGIN, LOGIN_MESSAGE, PASSWORD, REGISTER, REGISTER_MESSAGE, SIGN_IN, SIGN_UP, SUBMIT, USER_NAME } from "../../utilities/constants";
import { BUTTON_VARIANT, FORM_TYPE } from "../../utilities/enums";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const { isFetching, user } = useAppSelector(state => state.user);

    enum USER_FORM {
        LOGIN,
        REGISTER
    }

    const [formType, setFormType] = useState<USER_FORM>(USER_FORM.LOGIN);
    const [loginUser, setLoginUser] = useState<LoginUser>({
        email: EMPTY_STRING,
        password: EMPTY_STRING,
    });
    const [registerUser, setRegisterUser] = useState<RegisterUser>({
        firstName: EMPTY_STRING,
        lastName: EMPTY_STRING,
        userName: EMPTY_STRING,
        email: EMPTY_STRING,
        password: EMPTY_STRING,
        confirmPassword: EMPTY_STRING,
    });

    const handleLoginForm = () => setFormType(USER_FORM.LOGIN);

    const handleRegisterForm = () => setFormType(USER_FORM.REGISTER);

    const handleLogin = () => dispatch(fetchUser(loginUser));

    const handleRegister = () => {
        if (registerUser.password != registerUser.confirmPassword) return console.log('Not Equal');
        return console.log(registerUser);
    }

    const isLoginForm = formType == USER_FORM.LOGIN;

    if (isFetching) return <h1>Loading User...</h1>

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <Card className="w-50">
                <Card.Header>
                    {isLoginForm ? LOGIN : REGISTER}
                </Card.Header>

                <Form className="p-5">
                    {!isLoginForm &&
                        <>
                            <div className="d-flex">
                                <Form.Group className="mb-3 w-50 me-2">
                                    <Form.Label>{FIRST_NAME}</Form.Label>
                                    <Form.Control
                                        type={FORM_TYPE.TEXT}
                                        placeholder={FIRST_NAME}
                                        onChange={evt => setRegisterUser(prev => ({ ...prev, firstName: evt.target.value }))}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 w-50 ms-2">
                                    <Form.Label>{LAST_NAME}</Form.Label>
                                    <Form.Control
                                        type={FORM_TYPE.TEXT}
                                        placeholder={LAST_NAME}
                                        onChange={evt => setRegisterUser(prev => ({ ...prev, lastName: evt.target.value }))}
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Label>{USER_NAME}</Form.Label>
                                <Form.Control
                                    type={FORM_TYPE.TEXT}
                                    placeholder={USER_NAME}
                                    onChange={evt => setRegisterUser(prev => ({ ...prev, userName: evt.target.value }))}
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
                                isLoginForm
                                    ? setLoginUser(prev => ({ ...prev, email: evt.target.value }))
                                    : setRegisterUser(prev => ({ ...prev, email: evt.target.value }))
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{PASSWORD}</Form.Label>
                        <Form.Control
                            type={FORM_TYPE.PASSWORD}
                            placeholder={PASSWORD}
                            onChange={evt =>
                                isLoginForm
                                    ? setLoginUser(prev => ({ ...prev, password: evt.target.value }))
                                    : setRegisterUser(prev => ({ ...prev, password: evt.target.value }))
                            }
                        />
                    </Form.Group>

                    {!isLoginForm &&
                        <Form.Group className="mb-3">
                            <Form.Label>{CONFIRM_PASSWORD}</Form.Label>
                            <Form.Control
                                type={FORM_TYPE.PASSWORD}
                                placeholder={CONFIRM_PASSWORD}
                                onChange={evt => setRegisterUser(prev => ({ ...prev, confirmPassword: evt.target.value }))}
                            />
                        </Form.Group>
                    }

                    <Form.Group className="mb-3">
                        <div>
                            {isLoginForm ? REGISTER_MESSAGE : LOGIN_MESSAGE}
                            <span
                                role="button"
                                className="ps-1 pointer text-primary"
                                onClick={isLoginForm ? handleRegisterForm : handleLoginForm}
                            >
                                {isLoginForm ? SIGN_UP : SIGN_IN}
                            </span>
                        </div>
                    </Form.Group>

                    <Button
                        variant={BUTTON_VARIANT.PRIMARY}
                        onClick={isLoginForm ? handleLogin : handleRegister}
                    >
                        {SUBMIT}
                    </Button>
                </Form>
            </Card>
            <div>{user?.userName}</div>
        </div>
    )
}

export default LoginPage;
