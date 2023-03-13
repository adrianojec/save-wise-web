import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormGroup from "../../app/components/Form/FormGroup";
import { fetchAccount } from "../../app/store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks"
import { createTransaction, fetchTransactions } from "../../app/store/transactions/action";
import { CreateTransactionInput } from "../../app/store/transactions/types";
import { AMOUNT, DATE_CREATED, EMPTY_STRING, EXPENSE, INCOME, TOTAL, TRANSACTIONS_TYPE } from "../../app/utilities/constants";
import { FORM_TYPE, TransactionType, VARIANT } from "../../app/utilities/enums";
import Loading from "../loading/Loading";

const AccountDetailPage = () => {
	const dispatch = useAppDispatch();
	const { isFetching, account } = useAppSelector(state => state.accounts);
	const { transactions } = useAppSelector(state => state.transactions);
	const { id } = useParams();

	const [transaction, setTransaction] = useState<CreateTransactionInput>({
		accountId: id!,
		amount: 0.0,
		transactionType: 3,
	});

	const [value, setValue] = useState(EMPTY_STRING);

	const handleCreateTransaction = async () => {
		await dispatch(createTransaction(transaction));
		fetchCurrentAccount();
		fetchAccountTransactions();
		setValue(EMPTY_STRING);
	}

	const fetchCurrentAccount = async () => {
		if (!!!id) return console.log('No value');
		await dispatch(fetchAccount({ id }))
	}

	const fetchAccountTransactions = async () => {
		if (!!!id) return console.log('No value');
		await dispatch(fetchTransactions({ accountId: id }));
	}

	useEffect(() => {
		fetchCurrentAccount();
		fetchAccountTransactions();
	}, [id]);

	if (isFetching) return <Loading />

	return (
		<>
			<Row>
				<Col >
					<h1>Transactions</h1>
					<Table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Type</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map(transaction => {
								const { id, dateCreated, transactionType, amount } = transaction;

								return (
									<tr key={id}
										style={{ backgroundColor: transactionType == 1 ? "#FFD6D5" : "#CCFFCC" }}
									>
										<td>{moment(dateCreated).format('l')}</td>
										<td>{transactionType == 0 ? INCOME : EXPENSE}</td>
										<td>{amount}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
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
						type={FORM_TYPE.TEXT}
						placeholder={AMOUNT}
						value={value}
						onChange={evt => {
							setValue(evt.target.value);
							setTransaction(prev => ({ ...prev, amount: evt.target.value }));
						}}
					/>

					<Form.Check
						inline
						label={INCOME}
						name={TRANSACTIONS_TYPE}
						type={FORM_TYPE.RADIO}
						onChange={() => setTransaction(prev => ({ ...prev, transactionType: TransactionType.INCOME }))}
					/>

					<Form.Check
						inline
						label={EXPENSE}
						name={TRANSACTIONS_TYPE}
						type={FORM_TYPE.RADIO}
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
