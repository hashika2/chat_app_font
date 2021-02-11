import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>{
    return(
       
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            
            <div key={alert.id} className={`ui container  alert alert-${alert.alertType}`}>
                {alert.msg}

            </div>
           
        ))
        
        
    )
}

const mapStateToProps = state =>({
     alerts : state.alert.alert_data
   
});

export default connect(mapStateToProps)(Alert);