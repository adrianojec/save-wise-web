import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks"
import { ROUTE } from "../utilities/enums";
import PrivateLayout from "./PrivateLayout";

const PrivateRoute = () => {
    const { user } = useAppSelector(state => state.user);

    return !!user ? <PrivateLayout /> : <Navigate to={ROUTE.LOGIN} />
}

export default PrivateRoute
