import { Container } from "react-bootstrap"
import { navigationPaths } from "../../utilities/constants"
import NavigationBar from "./NavigationBar"

interface Props {
    children: JSX.Element,
}

const NavigationContainer = ({ children }: Props) => {
    return (
        <div className="vh-100">
            <NavigationBar navigationPaths={navigationPaths} />
            <Container className="mt-5 py-5">
                {children}
            </Container>
        </div>
    )
}

export default NavigationContainer
