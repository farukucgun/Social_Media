import React from 'react'
import { useAppSelector } from '../store';

import classes from './Alert.module.css';

interface AlertInterface {
    id: string;
    msg: string;
    alertType: string;
}

const Alert = () => {
    const alerts = useAppSelector(state => state.alert.alerts);
    // const loading = useAppSelector(state => state.post.loading);
    // console.log(loading); // always false
    // if (loading) {
    //     alerts.concat({id: "loading", msg: "Loading...", alertType: "info"});
    // }

    // useEffect(() => {
        
    // }, [alerts]);    

    if (alerts === null || alerts.length === 0) {
        return null;
    }

    return ( 
        <div className={classes.alerts}>
                {alerts.map((alert: AlertInterface) => (
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </div>    
                ))}
        </div>
    );
}

export default Alert