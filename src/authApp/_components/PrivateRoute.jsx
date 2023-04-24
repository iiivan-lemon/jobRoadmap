import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../_helpers';
import {useAppSelector} from "../../app/hooks";

export { PrivateRoute };

function PrivateRoute({ children }) {
    const authUser = useSelector(x => x?.auth?.user);
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}