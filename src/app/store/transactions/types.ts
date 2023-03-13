import { TransactionType } from "../../utilities/enums";

export interface TransactionState {
   isFetching: boolean,
   transactions: Transaction[],
   transaction?: Transaction,
}

export interface Transaction {
   transactionType: TransactionType,
   title: string,
   dateCreated: Date,
}

export interface CreateTransactionInput {
   accountId: string,
   transactionType: number,
   amount: number,
}

export interface FetchTransactionsInput {
   accountId: string
}

export interface FetchTransactionInput {
   accountId: string,
   id: string
}