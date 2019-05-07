import axios from 'axios';

const ROOT_URL = 'https://lab5-overlake333.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=t_olson';

// keys for actiontypes
export const ActionTypes = {
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  UPDATE_POST: 'UPDATE_POST',
  FETCH_POST: 'FETCH_POST',
  FETCH_POSTS: 'FETCH_POSTS',
};

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push('/');
      }).catch((error) => {
        console.log('ERROR: cannot create a new post');
        console.log(error);
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, id)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
        history.push('/');
      }).catch((error) => {
        console.log('ERROR: cannot delete the post');
        console.log(error);
      });
  };
}

export function updatePost(id, post) {
  // console.log(post);
  // console.log('isupdating');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      }).catch((error) => {
        console.log('ERROR: cannot update the current post');
        console.log(error);
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      }).catch((error) => {
        console.log('ERROR: cannot fetch the desired post');
        console.log(error);
      });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      }).catch((error) => {
        console.log('ERROR: cannot update the current post');
        console.log(error);
      });
  };
}
