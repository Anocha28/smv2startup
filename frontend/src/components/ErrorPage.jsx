
import { useRouteError, isRouteErrorResponse} from 'react-router-dom'
import MyAlert from './MyAlert';

const ErrorPage = () => {

    const error = useRouteError();
    let errorMessage;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.error?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        //console.error(error);
        errorMessage = 'unknown error';
    }
    return (
        <MyAlert status={'error'} title={'Error'} message={errorMessage} />
    )
}

export default ErrorPage