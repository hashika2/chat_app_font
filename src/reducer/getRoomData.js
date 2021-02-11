import LOGGED_USER from "../action/types";

const initialState ={
    data:null,
    isGetData:false
}

export default function(state=initialState,action){
    switch(action.type){
        case "GET_ROOM_DATA":
            return {
                ...state,
                data:action.payload,
                isGetDate:true
            }
        case LOGGED_USER:
            return {
                ...state,
                data:action.payload
            }
            default:
                return state;
    }

}