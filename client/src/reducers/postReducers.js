import { FETCH_POST, ADD_POST, DELETE_POST, SEARCH_POST } from "../actions/actionTypes";


export default function postReducer (state =[], action) {
    switch(action.type) {
        case FETCH_POST:
            return {
                posts: action.payload.posts
            };
        case ADD_POST:
            let posts = [...state];
            let postChanged = posts.find(post => post._id === action.payload._id);
            if(postChanged) {
                postChanged.title = action.payload.title;
                postChanged.description = action.payload.description;
                return posts;
            } 
            return [action.payload, ...state];
        case DELETE_POST:
            return state.filter(post => post._id !== action.payload._id);
        case SEARCH_POST:
            return {
                ...state,
                searchText: action.payload.searchText
            };
        default:
            return state;
    }
}