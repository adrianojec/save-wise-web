import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton, Form, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormGroup from "../../components/Form/FormGroup";
import { fetchAccount } from "../../store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { CreateTransactionInput } from "../../store/transactions/types";
import { AMOUNT, DATE_CREATED, EMPTY_STRING, TITLE, TOTAL, TRANSACTIONS_TYPE } from "../../utilities/constants";
import { FORM_TYPE, TransactionType, VARIANT } from "../../utilities/enums";
import Loading from "../loading/Loading";

const AccountDetailPage = () => {
	const dispatch = useAppDispatch();
	const { isFetching, account } = useAppSelector(state => state.accounts);
	const { id } = useParams();

	const [transaction, setTransaction] = useState<CreateTransactionInput>({
		accountId: id!,
		title: EMPTY_STRING,
		transactionType: TransactionType.INCOME,
	});

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
						label={TITLE}
						type={FORM_TYPE.TEXT}
						placeholder={AMOUNT}
						onChange={evt => setTransaction(prev => ({ ...prev, title: evt.targe.value }))}
					/>

					<DropdownButton
						title={TRANSACTIONS_TYPE}
						variant={VARIANT.SECONDARY}
					>
						<Dropdown.Item as="button">{TransactionType.INCOME}</Dropdown.Item>
						<Dropdown.Item as="button">{TransactionType.EXPENSE}</Dropdown.Item>
					</DropdownButton>

					<Button
						variant={VARIANT.PRIMARY}
					>
						Create
					</Button>
				</Col>
			</Row>
		</>
	)
}

export default AccountDetailPage
