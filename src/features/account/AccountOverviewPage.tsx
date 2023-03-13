import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormGroup from "../../app/components/Form/FormGroup";
import { createAccount, fetchAccounts } from "../../app/store/accounts/action";
import { CreateAccountInput } from "../../app/store/accounts/types";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { EMPTY_STRING, PROVIDE_TITLE, TITLE } from "../../app/utilities/constants";
import { FORM_TYPE, ROUTE, VARIANT } from "../../app/utilities/enums";
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
						>Create Account
						</Button>
					</Col>
				</Row>
			}

			{isCreatingAccount &&
				<Form className="w-100">
					<Row className="d-flex align-items-end mb-5">
						<Col md={{ span: 5, offset: 3 }} >
							<FormGroup
								className="mb-0"
								label={TITLE}
								type={FORM_TYPE.TEXT}
								placeholder={TITLE}
								isRequired={true}
								validationMessage={PROVIDE_TITLE}
								onChange={evt => setAccount(prev => ({ ...prev, title: evt.target.value }))}
							/>
						</Col>

						<Col md={{ span: 2 }}>
							<Button
								variant={VARIANT.PRIMARY}
								onClick={handleCreateAccount}
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
									onClick={() => navigate(`${ROUTE.ACCOUNTS}/${account.id}`)}
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
