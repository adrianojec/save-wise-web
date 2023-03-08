import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountDetailPage from "../features/account/AccountDetailPage";
import AccountOverviewPage from "../features/account/AccountOverviewPage";
import NotFoundPage from "../features/errors/NotFoundPage";
import HomePage from "../features/home/HomePage";
import Loading from "../features/loading/Loading";
import TransactionOverviewPage from "../features/transaction/TransactionOverviewPage";
import LoginPage from "../features/user/LoginPage";
import { useAppDispatch } from "../store/hooks";
import { fetchCurrentUser } from "../store/users/action";
import { PATH_NAME, USER_FORM } from "../utilities/enums";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const initApp = useCallback(
    async () => {
      try {
        await dispatch(fetchCurrentUser());
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch],
  )

  useEffect(
    () => { initApp().then(() => setLoading(false)); },
    [initApp],
  )

  if (loading) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_NAME.HOME} element={<PrivateRoute />}>
          <Route path={PATH_NAME.ACCOUNTS} element={<AccountOverviewPage />} />
          <Route path={PATH_NAME.ACCOUNT_DETAILS} element={<AccountDetailPage />} />
          <Route path={PATH_NAME.HOME} element={<HomePage />} />
          <Route path={PATH_NAME.TRANSACTIONS} element={<TransactionOverviewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path={PATH_NAME.LOGIN} element={<LoginPage formType={USER_FORM.LOGIN} />} />
        <Route path={PATH_NAME.REGISTER} element={<LoginPage formType={USER_FORM.REGISTER} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
