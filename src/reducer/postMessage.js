export default function(state={},action){
    switch(action.type){
        case 'AFTER_POST_MESSAGE':
            return {
                ...state,
                chats:action.payload
            }
        default:
            return state;
    }
}