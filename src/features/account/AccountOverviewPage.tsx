import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAccount, fetchAccounts } from "../../app/store/accounts/action";
import { CreateAccountInput } from "../../app/store/accounts/types";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { CREATE, CREATE_ACCOUNT, EMPTY_STRING, PROVIDE_TITLE, SELECT, TITLE } from "../../app/utilities/constants";
import { FORM_TYPE, ROUTE, VARIANT } from "../../app/utilities/enums";
import FormGroup from "../../app/components/Form/FormGroup";
import Loading from "../loading/Loading";

const AccountOverviewPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isFetching, accounts } = useAppSelector(state => state.accounts);

	const [account, setAccount] = useState<CreateAccountInput>({
		title: EMPTY_STRING
	});

	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchAccounts());
	}, []);

	const handleCreateAccount = async () => {
		await dispatch(createAccount(account));
		await dispatch(fetchAccounts());
		setIsCreatingAccount(false);
	};

	if (isFetching) return <Loading />

	return (
		<>
			{!isCreatingAccount &&
				<Row className="mb-5">
					<Col md={{ span: 6, offset: 3 }}>
						<Button
							className="w-100"
							onClick={() => setIsCreatingAccount(!isCreatingAccount)}
						>{CREATE_ACCOUNT}
						</Button>
					</Col>
				</Row>
			}

			{isCreatingAccount &&
				<Form className="w-100">
					<Row className="d-flex align-items-start">
						<Col md={{ span: 5, offset: 3 }} >
							<FormGroup
								type={FORM_TYPE.TEXT}
								placeholder={TITLE}
								isRequired={true}
								validationMessage={PROVIDE_TITLE}
								onChange={(value) => setAccount(prev => ({ ...prev, title: value }))}
							/>
						</Col>

						<Col
							md={{ span: 2 }}
							className="mb-3"
						>
							<Button
								variant={VARIANT.PRIMARY}
								onClick={handleCreateAccount}
							>
								{CREATE}
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
							<ListGroup.Item>
								<Row>
									<Col md={{ span: 10 }}>
										{account.title}
									</Col>

									<Col>
										<Button
											className="ms-3"
											variant={VARIANT.PRIMARY}
											size="sm"
											onClick={() => navigate(`${ROUTE.ACCOUNTS}/${account.id}`)}
										>
											{SELECT}
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					)}
				</div>
			</Container>
		</>
	);

}

export default AccountOverviewPage
