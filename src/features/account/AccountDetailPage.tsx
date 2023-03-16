import moment from "moment";
import FormGroup from "../../app/components/Form/FormGroup";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchAccount, updateAccount } from "../../app/store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks"
import { createTransaction, fetchTransactions, updateTransaction } from "../../app/store/transactions/action";
import { CreateTransactionInput, UpdateTransactionInput } from "../../app/store/transactions/types";
import { UpdateAccountInput } from "../../app/store/accounts/types";
import { ACTION, ADD_TRANSACTION, AMOUNT, CREATE, DATE, DATE_CREATED, EDIT, EMPTY_STRING, EXPENSE, INCOME, LIGHT_GREEN, LIGHT_RED, TOTAL, TRANSACTIONS, TRANSACTIONS_TYPE, TYPE, UPDATE, UPDATE_TRANSACTION } from "../../app/utilities/constants";
import { FORM_TYPE, TransactionType, VARIANT } from "../../app/utilities/enums";

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

	const [updatedTransaction, setUpdatedTransaction] = useState<UpdateTransactionInput>({
		accountId: id!,
		id: EMPTY_STRING,
		amount: 0.0,
		transactionType: 3,
	});

	const [updatedAccount, setUpdatedAccount] = useState<UpdateAccountInput>({
		id: id!,
		title: EMPTY_STRING
	});

	const [value, setValue] = useState<number>(0);

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);

	const handleCreateTransaction = async () => {
		await dispatch(createTransaction(transaction));
		fetchCurrentAccount();
		fetchAccountTransactions();
		setValue(0);
	}

	const handleUpdateTransaction = async () => {
		await dispatch(updateTransaction(updatedTransaction));
		fetchAccountTransactions();
		fetchCurrentAccount();
		setValue(0);
		setIsEditing(false);
	}

	const handleUpdateAccount = async () => {
		await dispatch(updateAccount(updatedAccount));
		fetchCurrentAccount();
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

	const isIncome = updatedTransaction.transactionType == TransactionType.INCOME;

	const isExpense = updatedTransaction.transactionType == TransactionType.EXPENSE;

	if (isFetching) return <Loading />

	return (
		<>
			<Row>
				<Col >
					<h1>{TRANSACTIONS}</h1>
					<Table>
						<thead>
							<tr>
								<th>{DATE}</th>
								<th>{TYPE}</th>
								<th>{AMOUNT}</th>
								<th>{ACTION}</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map(transaction => {
								const { id, dateCreated, transactionType, amount } = transaction;
								const isIncome = transactionType == TransactionType.INCOME;
								const isExpense = transactionType == TransactionType.EXPENSE;

								return (
									<tr
										key={id}
										style={{ backgroundColor: isExpense ? LIGHT_RED : LIGHT_GREEN }}
									>
										<td>{moment(dateCreated).format('l')}</td>
										<td>{isIncome ? INCOME : EXPENSE}</td>
										<td>{isExpense && '-'}{amount}</td>
										<td>
											<Button
												variant={VARIANT.OUTLINE_DARK}
												size="sm"
												onClick={() => {
													setUpdatedTransaction(prev => ({ ...prev, id: id, amount: amount, transactionType: transactionType }))
													setValue(amount);
													setIsEditing(true);
												}}
											>
												{EDIT}
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Col>

				<Col md="auto">
					<Card className="mb-5">
						<Card.Header>
							<Row>
								<Col>
									{isEditingAccount
										? <Form.Control
											type={FORM_TYPE.TEXT}
											defaultValue={account?.title}
											onChange={(value) => setUpdatedAccount((prev) => ({ ...prev, title: value.target.value }))}
										/>
										: <h4>{account?.title}</h4>
									}
								</Col>
								<Col md="auto">
									<Button
										variant={VARIANT.OUTLINE_DARK}
										size="sm"
										onClick={() => {
											setIsEditingAccount(!isEditingAccount);
											isEditingAccount && handleUpdateAccount();
										}}
									>
										{isEditingAccount ? UPDATE : EDIT}
									</Button>
								</Col>
							</Row>
						</Card.Header>
						<ListGroup variant={VARIANT.FLUSH}>
							<ListGroup.Item>{TOTAL}: {account?.total}</ListGroup.Item>
							<ListGroup.Item>{DATE_CREATED}: {moment(account?.dateCreated).format('l')}</ListGroup.Item>
						</ListGroup>
					</Card>

					<h4>{isEditing ? UPDATE_TRANSACTION : ADD_TRANSACTION}</h4>

					<FormGroup
						type={FORM_TYPE.TEXT}
						placeholder={AMOUNT}
						defaultValue={value != 0 ? value.toString() : EMPTY_STRING}
						onChange={evt => {
							isEditing
								? setUpdatedTransaction((prev) => ({ ...prev, amount: evt.target.value }))
								: setTransaction((prev) => ({ ...prev, amount: evt.target.value }));
						}}
					/>

					<Form.Check
						inline
						label={INCOME}
						checked={isEditing ? isIncome : undefined}
						name={TRANSACTIONS_TYPE}
						type={FORM_TYPE.RADIO}
						onChange={() => {
							isEditing
								? setUpdatedTransaction(prev => ({ ...prev, transactionType: TransactionType.INCOME }))
								: setTransaction(prev => ({ ...prev, transactionType: TransactionType.INCOME }));
						}}
					/>

					<Form.Check
						inline
						label={EXPENSE}
						checked={isEditing ? isExpense : undefined}
						name={TRANSACTIONS_TYPE}
						type={FORM_TYPE.RADIO}
						onChange={() => {
							isEditing
								? setUpdatedTransaction(prev => ({ ...prev, transactionType: TransactionType.EXPENSE }))
								: setTransaction(prev => ({ ...prev, transactionType: TransactionType.EXPENSE }));
						}}
					/>

					<Button
						variant={VARIANT.PRIMARY}
						onClick={isEditing ? handleUpdateTransaction : handleCreateTransaction}
					>
						{isEditing ? UPDATE : CREATE}
					</Button>
				</Col>
			</Row>
		</>
	)
}

export default AccountDetailPage
