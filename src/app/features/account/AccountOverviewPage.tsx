import { useEffect } from "react";
import { fetchAccounts } from "../../store/accounts/action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AccountOverviewPage = () => {

    const dispatch = useAppDispatch();
    const { isFetching, accounts } = useAppSelector(state => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts());
    }, []);

    if (isFetching) return <h1>Loading...</h1>

    return <ul>
        {accounts.map(account => <li key={account.id}>{account.title}</li>)}
    </ul>

}

export default AccountOverviewPage
