import { TransactionType } from "../../utilities/enums";

export interface TransactionState {
   isFetching: boolean,
   transactions: Transaction[],
   transaction?: Transaction,
}

export interface Transaction {
   id: string,
   transactionType: TransactionType,
   amount: string,
   dateCreated: Date,
}

export interface CreateTransactionInput {
   accountId: string,
   transactionType: TransactionType,
   amount: number,
}

export interface FetchTransactionsInput {
   accountId: string
}

export interface FetchTransactionInput {
   accountId: string,
   id: string
}

export interface UpdateTransactionInput {
   id: string,
   accountId: string,
   transactionType: TransactionType,
   amount: number,
}