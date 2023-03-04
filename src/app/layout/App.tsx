import { ToastContainer } from "react-toastify";
import AccountOverviewPage from "../features/account/AccountOverviewPage";
import BuggyPage from "../features/errors/ErrorPage";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar
        theme="colored"
      />

      <AccountOverviewPage />
      <BuggyPage />
    </>
  );
}

export default App;
