import { Container } from "react-bootstrap"
import { navigationPaths } from "../utilities/constants"
import NavigationBar from "../components/Navigation/NavigationBar"
import { Outlet } from "react-router-dom"


const PrivateLayout = () => {
    return (
        <div className="vh-100">
            <NavigationBar navigationPaths={navigationPaths} />
            <h1>Hi</h1>
            <Container className="py-5">
                <Outlet />
            </Container>
        </div>
    )
}

export default PrivateLayout
