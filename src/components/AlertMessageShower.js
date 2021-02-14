export const AlertMessageShower =(timeout)=>{
    if (timeout) {
        return (
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Session Alert!</h4>
            <p>Session will expired few minutes</p>
          </div>
        );
      }
      return null;
}