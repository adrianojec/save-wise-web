import { Nav, Navbar } from 'react-bootstrap'
import { NavigationPath } from '../../models/navigation_path'
import { APP_NAME, LOGIN } from '../../utilities/constants'
import { PATH_NAME, VARIANT } from '../../utilities/enums'

interface Props {
    navigationPaths: NavigationPath[],
}

const NavigationBar = ({ navigationPaths }: Props) => {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant={VARIANT.DARK}
            fixed="top"
            className="px-5"
        >
            <Navbar.Brand href="#home">{APP_NAME}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="me-auto">
                    {
                        navigationPaths.map(navigationPath => {
                            const { title, path } = navigationPath;

                            return <Nav.Link
                                key={title}
                                href={path}
                            >
                                {title}
                            </Nav.Link>
                        })
                    }


                </Nav>
                <Nav>
                    <Nav.Link href={PATH_NAME.LOGIN}>{LOGIN}</Nav.Link>
                    <Nav.Link eventKey={2} href={PATH_NAME.REGISTER}>
                        Dank memes
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar
