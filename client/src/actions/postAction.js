import { DELETE_POST, FETCH_POST, ADD_POST, SEARCH_POST } from "./actionTypes"
import axios from 'axios'

export const fetchAllPostSuccess = (posts) => {
    return {
        type: FETCH_POST,
        payload: {
            posts
        }
    }
} 

export const fetchAllPost = () => {
    return (dispatch) => {
        return axios.get('/posts')
            .then(res => {
                dispatch(fetchAllPostSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const addPostSuccess = (post) => {
    return {
        type: ADD_POST,
        payload: {
            _id: post._id,
            title: post.title,
            description: post.description
        }
    }
}

export const addPost = (post) => {
    return (dispatch) => {
        return axios.post('/addPost', post)
            .then(res => {
                dispatch(addPostSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const deletePostSuccess = (_id) => {
    return {
        type: DELETE_POST,
        payload: {
            _id: _id
        }        
    }
}

export const deletePost = (_id) => {
    return (dispatch) => {
        return axios.delete('/deletePost/' + _id)
            .then(res => {
                dispatch(deletePostSuccess(_id));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const searchPostSuccess = (searchText) => {
    return {
        type: SEARCH_POST,
        payload: {
            searchText
        }
    }
} 

