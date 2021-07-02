const initialesState = {
  data: null,
};

export default function (state = initialesState, action) {
  switch (action.type) {
    case "LOGGED_USER":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
