import { navigationPaths } from "../../utilities/constants"
import NavigationBar from "./NavigationBar"

interface Props {
    children: JSX.Element,
}

const NavigationContainer = ({ children }: Props) => {
    return (
        <>
            <NavigationBar navigationPaths={navigationPaths} />
            <div className="pt-5">
                {children}
            </div>
        </>
    )
}

export default NavigationContainer
