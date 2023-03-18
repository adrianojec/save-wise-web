import { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAccount, deleteAccount, fetchAccounts } from "../../app/store/accounts/action";
import { CreateAccountInput, DeleteAccountInput } from "../../app/store/accounts/types";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { CREATE, CREATE_ACCOUNT, DELETE, DELETE_MESSAGE, EMPTY_STRING, PROVIDE_TITLE, SELECT, TITLE } from "../../app/utilities/constants";
import { FORM_TYPE, ROUTE, VARIANT } from "../../app/utilities/enums";
import FormGroup from "../../app/components/Form/FormGroup";
import Loading from "../loading/Loading";
import SaveWiseModal from "../../app/components/Modal/SaveWiseModal";

const AccountOverviewPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isFetching, accounts } = useAppSelector(state => state.accounts);

	const [account, setAccount] = useState<CreateAccountInput>({
		title: EMPTY_STRING
	});

	const [accountToDelete, setAccountToDelete] = useState<DeleteAccountInput>({
		id: EMPTY_STRING,
	});

	const [isModalShown, setIsModalShown] = useState<boolean>(false);

	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);

	const [message, setMessage] = useState<string>(EMPTY_STRING);

	useEffect(() => {
		dispatch(fetchAccounts());
	}, []);

	const handleCreateAccount = async () => {
		await dispatch(createAccount(account));
		await dispatch(fetchAccounts());
		setIsCreatingAccount(false);
	};

	const handleShowModal = () => setIsModalShown(!isModalShown);

	const handleDeleteAccount = async () => {
		await dispatch(deleteAccount(accountToDelete));
		await dispatch(fetchAccounts());
		handleShowModal();
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
					{accounts.map(account => {
						const { id, title } = account;

						return <ListGroup
							key={id}
							className="mb-2"
						>
							<ListGroup.Item>
								<Row>
									<Col md={{ span: 8 }}>
										{title}
									</Col>

									<Col md={{ span: 2 }}>
										<Button
											className="ms-3"
											variant={VARIANT.PRIMARY}
											size="sm"
											onClick={() => navigate(`${ROUTE.ACCOUNTS}/${id}`)}
										>
											{SELECT}
										</Button>
									</Col>

									<Col md={{ span: 2 }}>
										<Button
											variant={VARIANT.PRIMARY}
											size="sm"
											onClick={() => {
												setMessage(DELETE_MESSAGE(title));
												setAccountToDelete({ id: id });
												setIsModalShown(true);
											}}
										>
											{DELETE}
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>;

					}
					)}
				</div>
			</Container>

			<SaveWiseModal
				isShown={isModalShown}
				message={message}
				onClose={handleShowModal}
				onConfirm={handleDeleteAccount}
			/>
		</>
	);

}

export default AccountOverviewPage
