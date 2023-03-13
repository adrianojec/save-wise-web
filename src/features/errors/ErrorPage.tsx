import { Button } from "react-bootstrap";
import axios from 'axios';
import { useState } from "react";
import ValidationErrorPage from "./ValidationErrorPage";
import { APP_BASE_URL } from "../../app/utilities/constants";

const BuggyPage = () => {
    const [errors, setErrors] = useState<string[]>([]);

    function handleNotFound() {
        axios.get(APP_BASE_URL + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(APP_BASE_URL + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(APP_BASE_URL + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(APP_BASE_URL + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(APP_BASE_URL + 'accounts/notaguid').catch(err => console.log(err.response));
    }

    // function handleValidationError() {
    //     axios.post(baseUrl + 'accounts/80d07d2f-2f7d-4536-b566-7d62e75949eb/transactions', {}).catch(err => setErrors([err.response.data]));
    // }

    return (
        <>
            <div>
                <Button variant="primary" onClick={handleNotFound}>Not Found</Button>
                <Button variant="primary" onClick={handleBadRequest}>Bad Request</Button>
                {/* <Button variant="primary" onClick={handleValidationError}>Validation Error</Button> */}
                <Button variant="primary" onClick={handleServerError}>Server Error</Button>
                <Button variant="primary" onClick={handleUnauthorised}>Unauthorized</Button>
                <Button variant="primary" onClick={handleBadGuid}>Bad Guid</Button>
            </div>
            {errors && <ValidationErrorPage errors={errors} />}
        </>
    )
}

export default BuggyPage