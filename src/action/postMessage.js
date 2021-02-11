export const afterPostMessage = (postMessagedata)=>{
    return({
        type:"AFTER_POST_MESSAGE",
        payload:postMessagedata
    })
}