import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authCheck, logout } from '../services/authSlice';

const TokenCheck = () => {
    const dispatch = useDispatch()
    const { isSuccess, status } = useSelector(state=>state.auth.auth)
    const { user } = useSelector(state=>state.auth)
    //const MINUTE_MS = 5 * 1000;

    useEffect(()=>{
        if(!isSuccess && status === 'Not authorized.'){
            dispatch(logout())
        }
    },[isSuccess, status, dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            if(user) {dispatch(authCheck())}
            //console.log(`Logs ${Date.now()} `);
        }, 300000); //1000*60*5

        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => clearInterval(interval); 
    }, [dispatch, user])

    return (
        <div />
    )
}

export default TokenCheck