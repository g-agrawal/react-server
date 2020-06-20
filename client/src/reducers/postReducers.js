import { FETCH_POST, ADD_POST, DELETE_POST, SEARCH_POST } from "../actions/actionTypes";


export default function postReducer (state =[], action) {
    switch(action.type) {
        case FETCH_POST:
            return {
                posts: action.payload.posts
            };
        case ADD_POST:
            let posts = [...state.posts];
            let postChanged = posts.find(post => post._id === action.payload._id);
            if(postChanged) {
                postChanged.title = action.payload.title;
                postChanged.description = action.payload.description;
                return {
                    posts: posts
                };
            } 
            return {
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id)
            };
        case SEARCH_POST:
            return {
                ...state,
                searchText: action.payload.searchText
            };
        default:
            return {
                posts: state.posts
            };
    }
}