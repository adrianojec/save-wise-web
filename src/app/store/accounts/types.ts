export interface AccountsState {
    isFetching: boolean,
    accounts: Account[],
    account?: Account,

}

export interface Account {
    id: string;
    title: string;
    total: number;
    dateCreated: Date;
}

export interface CreateAccount {
    title: string;
}

export interface UpdateAccount {
    title: string;
}

export interface FetchAccountInput {
    id: string;
}