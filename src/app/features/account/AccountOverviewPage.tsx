import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { Account } from "../../models/account";

const AccountOverviewPage = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        agent.Accounts.list().then(response => {
            setAccounts(response);
        })
    }, []);

    return <ul>
        {accounts.map(account => <li>{account.title}</li>)}
    </ul>

}

export default AccountOverviewPage
