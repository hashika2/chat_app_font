import React from "react";
 
 const AlertMessageShower =({timeout})=>{
  if (timeout) {
        return (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Warning!</strong> Session will expire soon
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
      }
      return null;
}

export default AlertMessageShower