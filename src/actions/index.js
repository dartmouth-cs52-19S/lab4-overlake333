import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://lab5-overlake333.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=t_olson';

// keys for actiontypes
export const ActionTypes = {
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  UPDATE_POST: 'UPDATE_POST',
  FETCH_POST: 'FETCH_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
};

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        history.push('/');
      }).catch((error) => {
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
        console.log(error);
      });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      }).catch((error) => {
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
        console.log(error);
      });
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: error });
      // eslint-disable-next-line no-alert
      alert('Sign In Failed: the syntax of the request entity is correct');
    });
  };
}


export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: error });
      // eslint-disable-next-line no-alert
      alert('Sign Up Failed: the syntax of the request entity is correct');
    });
  };
}

export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
