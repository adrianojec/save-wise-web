import { Container } from "react-bootstrap"
import { navigationPaths } from "../utilities/constants"
import NavigationBar from "../components/Navigation/NavigationBar"
import { Outlet } from "react-router-dom"


const PrivateLayout = () => {
    return (
        <div className="vh-100">
            <NavigationBar navigationPaths={navigationPaths} />

            <Container className="py-5 mt-5">
                <Outlet />
            </Container>
        </div>
    )
}

export default PrivateLayout
