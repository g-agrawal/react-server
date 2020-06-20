import { FETCH_POST, ADD_POST, DELETE_POST, SEARCH_POST } from "../actions/actionTypes";


export default function postReducer (state =[], action) {
    switch(action.type) {
        case FETCH_POST:
            return {
                posts: action.payload.posts,
                searchText: state.searchText
            };
        case ADD_POST:
            let posts = [...state.posts];
            let postChanged = posts.find(post => post._id === action.payload._id);
            if(postChanged) {
                postChanged.title = action.payload.title;
                postChanged.description = action.payload.description;
                return {
                    posts: posts,
                    searchText: state.searchText
                };
            } 
            return {
                posts: [action.payload, ...state.posts],
                searchText: state.searchText
            };
        case DELETE_POST:
            return {
                posts: state.posts.filter(post => post._id !== action.payload._id),
                searchText: state.searchText
            };
        case SEARCH_POST:
            return {
                ...state,
                searchText: action.payload.searchText
            };
        default:
            return {
                posts: state.posts,
                searchText: state.searchText
            };
    }
}