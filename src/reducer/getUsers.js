export default function(state={},action){
    switch(action.type){
        case 'LOGGED_USER':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}