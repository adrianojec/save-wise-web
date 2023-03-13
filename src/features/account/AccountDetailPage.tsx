import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormGroup from "../../app/components/Form/FormGroup";
import { fetchAccount } from "../../app/store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks"
import { createTransaction } from "../../app/store/transactions/action";
import { CreateTransactionInput } from "../../app/store/transactions/types";
import { AMOUNT, DATE_CREATED, EXPENSE, INCOME, TOTAL } from "../../app/utilities/constants";
import { FORM_TYPE, TransactionType, VARIANT } from "../../app/utilities/enums";
import Loading from "../loading/Loading";

const AccountDetailPage = () => {
	const dispatch = useAppDispatch();
	const { isFetching, account } = useAppSelector(state => state.accounts);
	const { id } = useParams();

	const [transaction, setTransaction] = useState<CreateTransactionInput>({
		accountId: id!,
		amount: 0.0,
		transactionType: 3,
	});

	const handleCreateTransaction = async () => {
		await dispatch(createTransaction(transaction));
	}

	const fetchCurrentAccount = async () => {
		if (!!!id) return console.log('No value');
		await dispatch(fetchAccount({ id }))
	}

	useEffect(() => {
		fetchCurrentAccount();
	}, [id]);

	if (isFetching) return <Loading />

	return (
		<>
			<Row>
				<Col >
					<h1>Transactions</h1>
				</Col>

				<Col md="auto">
					<Card className="mb-5">
						<Card.Header>{account?.title}</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>{TOTAL}: {account?.total}</ListGroup.Item>
							<ListGroup.Item>{DATE_CREATED}: {moment(account?.dateCreated).format('l')}</ListGroup.Item>
						</ListGroup>
					</Card>

					<h4>Add transaction</h4>

					<FormGroup
						label={AMOUNT}
						type={FORM_TYPE.TEXT}
						placeholder={AMOUNT}
						onChange={evt => setTransaction(prev => ({ ...prev, amount: evt.target.value }))}
					/>

					<Form.Check
						inline
						label={INCOME}
						name="group1"
						type="radio"
						onChange={() => setTransaction(prev => ({ ...prev, transactionType: TransactionType.INCOME }))}
					/>
					<Form.Check
						inline
						label={EXPENSE}
						name="group1"
						type="radio"
						onChange={() => setTransaction(prev => ({ ...prev, transactionType: TransactionType.EXPENSE }))}
					/>

					<Button
						variant={VARIANT.PRIMARY}
						onClick={handleCreateTransaction}
					>
						Create
					</Button>
				</Col>
			</Row>
		</>
	)
}

export default AccountDetailPage
