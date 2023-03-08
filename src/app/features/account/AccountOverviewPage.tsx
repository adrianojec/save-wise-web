import { useEffect, useState } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchAccounts } from "../../store/accounts/action";
import { CreateAccount } from "../../store/accounts/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { EMPTY_STRING, TITLE } from "../../utilities/constants";
import { FORM_TYPE, PATH_NAME, VARIANT } from "../../utilities/enums";
import Loading from "../loading/Loading";

const AccountOverviewPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isFetching, accounts } = useAppSelector(state => state.accounts);

    const [createAccount, setCreateAccount] = useState<CreateAccount>({
        title: EMPTY_STRING
    });

    useEffect(() => {
        dispatch(fetchAccounts());
    }, []);

    if (isFetching) return <Loading />

    return (
        <>
            <Container className="w-50 d-flex justify-content-center mb-5">
                <Form className="w-100">
                    <Form.Group className="mb-3 me-2">
                        <Form.Label>{TITLE}</Form.Label>
                        <Form.Control
                            type={FORM_TYPE.TEXT}
                            placeholder={TITLE}
                            onChange={evt => setCreateAccount(prev => ({ ...prev, title: evt.target.value }))}
                        />
                    </Form.Group>
                    <Button
                        variant={VARIANT.PRIMARY}
                        onClick={() => console.log(createAccount)}
                    >
                        Create
                    </Button>
                </Form>
            </Container>

            <Container className="w-50 d-flex justify-content-center">
                <div className="w-100">
                    {accounts.map(account =>
                        <ListGroup
                            key={account.id}
                            className="mb-2"
                        >
                            <ListGroup.Item className="w-100 d-flex justify-content-between">
                                {account.title}
                                <Button
                                    variant={VARIANT.PRIMARY}
                                    onClick={() => navigate(`${PATH_NAME.ACCOUNTS}/${account.id}`)}
                                >
                                    Select
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </div>
            </Container>
        </>
    );

}

export default AccountOverviewPage
