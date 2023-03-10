import moment from "moment";
import { useEffect } from "react";
import { Card, Col, Dropdown, DropdownButton, Form, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchAccount } from "../../store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { AMOUNT, DATE_CREATED, TITLE, TOTAL, TRANSACTIONS_TYPE } from "../../utilities/constants";
import { FORM_TYPE, TransactionType, VARIANT } from "../../utilities/enums";
import Loading from "../loading/Loading";

const AccountDetailPage = () => {
	const dispatch = useAppDispatch();
	const { isFetching, account } = useAppSelector(state => state.accounts);
	const { id } = useParams();

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

					<Form.Group className="mb-3">
						<Form.Control
							type={FORM_TYPE.TEXT}
							placeholder={AMOUNT}
						/>
					</Form.Group>

					<DropdownButton
						title={TRANSACTIONS_TYPE}
						variant={VARIANT.SECONDARY}
					>
						<Dropdown.Item as="button">{TransactionType.INCOME}</Dropdown.Item>
						<Dropdown.Item as="button">{TransactionType.EXPENSE}</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
		</>
	)
}

export default AccountDetailPage
