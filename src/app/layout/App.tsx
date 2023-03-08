import { Route, Routes } from "react-router-dom";
import AccountDetailPage from "../features/account/AccountDetailPage";
import AccountOverviewPage from "../features/account/AccountOverviewPage";
import HomePage from "../features/home/HomePage";
import TransactionOverviewPage from "../features/transaction/TransactionOverviewPage";
import LoginPage from "../features/user/LoginPage";
import { PATH_NAME, USER_FORM } from "../utilities/enums";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={PATH_NAME.HOME} element={<HomePage />} />
        <Route path={PATH_NAME.ACCOUNTS} element={<AccountOverviewPage />} />
        <Route path={PATH_NAME.ACCOUNT_DETAILS} element={<AccountDetailPage />} />
        <Route path={PATH_NAME.TRANSACTIONS} element={<TransactionOverviewPage />} />
        <Route path={PATH_NAME.LOGIN} element={<LoginPage formType={USER_FORM.LOGIN} />} />
        <Route path={PATH_NAME.REGISTER} element={<LoginPage formType={USER_FORM.REGISTER} />} />
      </Routes>
    </>

  );
}

export default App;
