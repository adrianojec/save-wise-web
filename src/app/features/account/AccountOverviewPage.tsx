import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
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

	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchAccounts());
	}, []);

	if (isFetching) return <Loading />

	return (
		<>
			{!isCreatingAccount &&
				<Row className="mb-5">
					<Col md={{ span: 6, offset: 3 }}>
						<Button
							className="w-100"
							onClick={() => setIsCreatingAccount(!isCreatingAccount)}
						>Create Account
						</Button>
					</Col>
				</Row>
			}

			{isCreatingAccount &&
				<Form className="w-100">
					<Row className="d-flex align-items-end">
						<Col md={{ span: 5, offset: 3 }} >
							<Form.Group className="me-2">
								<Form.Label>{TITLE}</Form.Label>
								<Form.Control
									type={FORM_TYPE.TEXT}
									placeholder={TITLE}
									onChange={evt => setCreateAccount(prev => ({ ...prev, title: evt.target.value }))}
								/>
							</Form.Group>
						</Col>

						<Col md={{ span: 2 }}>
							<Button
								variant={VARIANT.PRIMARY}
								onClick={() => console.log(createAccount)}
							>
								Create
							</Button>
						</Col>
					</Row>
				</Form>
			}

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
