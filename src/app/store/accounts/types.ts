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

export interface CreateAccountInput {
    title: string;
}

export interface UpdateAccountInput {
    id: string;
    title: string;
}

export interface FetchAccountInput {
    id: string;
}

export interface DeleteAccountInput {
    id: string;
}